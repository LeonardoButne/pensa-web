import { ImageDisease } from '../domain/models';
import { Disease } from '../domain/models/Disease';
import { Op } from 'sequelize';
import { removeFileFromDisk } from '../util/save-files-to-disk';
import { writeFile } from 'fs/promises';
import { resolve, extname } from 'path';
import * as fs from 'fs';

export interface PaginationOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class DiseaseService {
  // Função para salvar arquivo na pasta específica de diseases
  private static async saveDiseaseImage(file: Express.Multer.File): Promise<string> {
    const nr_aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);
    const uniqueName = `${Date.now()}_${nr_aleatorio()}${extname(file.originalname)}`;
    const uploadRoot = resolve(process.cwd(), 'uploads', 'images', 'diseases');

    // Cria a pasta se não existir
    if (!fs.existsSync(uploadRoot)) {
      fs.mkdirSync(uploadRoot, { recursive: true });
    }

    const filePath = resolve(uploadRoot, uniqueName);
    await writeFile(filePath, file.buffer);
    return uniqueName;
  }

  // Função para remover arquivo da pasta específica de diseases
  private static async removeDiseaseImage(fileName: string): Promise<void> {
    const filePath = resolve(process.cwd(), 'uploads', 'images', 'diseases', fileName);
    try {
      const { unlink } = await import('fs/promises');
      await unlink(filePath);
    } catch (e) {
      console.error('Erro ao remover imagem de doença:', e);
    }
  }
  static async findAll(): Promise<Disease[]> {
    return await Disease.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
    });
  }

  static async findById(id: number): Promise<Disease | null> {
    return await Disease.findOne({
      where: { id, isActive: true },
    });
  }

  static async findHighlighted(): Promise<Disease[]> {
    return await Disease.findAll({
      where: {
        isActive: true,
        isHighlighted: true,
      },
      order: [['updatedAt', 'DESC']],
    });
  }

  static async findAllWithPagination(options: PaginationOptions): Promise<PaginationResult<Disease>> {
    const { page, limit, search } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Disease.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{ model: ImageDisease, as: 'image' }],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  static async create(data: any): Promise<{ disease: Disease }> {
    let savedFileName: string | null = null;

    try {
      // Primeiro cria a doença sem a imagem
      const disease = await Disease.create(data);

      // Só depois salva a imagem se existe e se a doença foi criada com sucesso
      if (data.imageFile && data.imageFile.buffer) {
        // Cria um objeto Multer.File temporário
        const multerFile: Express.Multer.File = {
          fieldname: 'image',
          originalname: data.imageFile.originalName,
          encoding: '7bit',
          mimetype: data.imageFile.mimetype,
          buffer: data.imageFile.buffer,
          size: data.imageFile.buffer.length,
          stream: {} as any,
          destination: '',
          filename: '',
          path: '',
        };

        // Salva na pasta específica de diseases
        savedFileName = await this.saveDiseaseImage(multerFile);

        // Cria registro no banco
        await ImageDisease.create({
          fileName: savedFileName,
          originalName: data.imageFile.originalName,
          diseaseId: disease.id,
        });
      }

      return { disease };
    } catch (error) {
      // Se houve erro e um arquivo foi salvo, remove ele
      if (savedFileName) {
        await this.removeDiseaseImage(savedFileName);
      }
      throw error;
    }
  }

  static async update(id: string, data: any): Promise<Disease | null> {
    let savedFileName: string | null = null;

    try {
      // Primeiro atualiza a doença
      const [updatedRows] = await Disease.update(data, {
        where: { id },
      });

      if (updatedRows === 0) {
        return null;
      }

      // Se há nova imagem, processa ela
      if (data.imageFile && data.imageFile.buffer) {
        // Remove imagem antiga se existir
        const existingImage = await ImageDisease.findOne({ where: { diseaseId: id } });
        if (existingImage) {
          await this.removeDiseaseImage(existingImage.fileName);
          await existingImage.destroy();
        }

        // Cria um objeto Multer.File temporário
        const multerFile: Express.Multer.File = {
          fieldname: 'image',
          originalname: data.imageFile.originalName,
          encoding: '7bit',
          mimetype: data.imageFile.mimetype,
          buffer: data.imageFile.buffer,
          size: data.imageFile.buffer.length,
          stream: {} as any,
          destination: '',
          filename: '',
          path: '',
        };

        // Salva nova imagem na pasta específica
        savedFileName = await this.saveDiseaseImage(multerFile);

        // Cria novo registro no banco
        await ImageDisease.create({
          fileName: savedFileName,
          originalName: data.imageFile.originalName,
          diseaseId: id,
        });
      }

      return await Disease.findByPk(id);
    } catch (error) {
      // Se houve erro e um arquivo foi salvo, remove ele
      if (savedFileName) {
        await this.removeDiseaseImage(savedFileName);
      }
      throw error;
    }
  }

  static async delete(id: number): Promise<boolean> {
    // Remove imagem associada antes de deletar a doença
    const existingImage = await ImageDisease.findOne({ where: { diseaseId: id } });
    if (existingImage) {
      await this.removeDiseaseImage(existingImage.fileName);
      await existingImage.destroy();
    }

    const deletedRows = await Disease.destroy({
      where: { id },
    });

    return deletedRows > 0;
  }

  static async setHighlight(
    id: number,
    isHighlighted: boolean,
    highlightType?: 'week' | 'month',
  ): Promise<Disease | null> {
    // If setting as highlighted, remove highlight from others of the same type
    if (isHighlighted && highlightType) {
      await Disease.update(
        { isHighlighted: false },
        {
          where: {
            highlightType,
            id: { [Op.ne]: id },
          },
        },
      );
    }

    const [updatedRows] = await Disease.update(
      { isHighlighted, highlightType: isHighlighted ? highlightType : null },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return null;
    }

    return await Disease.findByPk(id);
  }

  static async getStats(): Promise<{ totalDiseases: number; highlightedDiseases: number }> {
    const totalDiseases = await Disease.count();
    const highlightedDiseases = await Disease.count({ where: { isHighlighted: true } });

    return { totalDiseases, highlightedDiseases };
  }
}
