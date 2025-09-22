import type { Request, Response } from 'express';
import { DiseaseService } from '../services/disease.service';

export class DiseaseController {
  // Public routes
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const diseases = await DiseaseService.findAll();
      res.json(diseases);
    } catch (error) {
      console.error('Erro ao buscar doenças:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await DiseaseService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas de doenças:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const disease = await DiseaseService.findById(Number(id));

      if (!disease) {
        res.status(404).json({ error: 'Doença não encontrada' });
        return;
      }

      res.json(disease);
    } catch (error) {
      console.error('Erro ao buscar doença:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getHighlighted(req: Request, res: Response): Promise<void> {
    try {
      const diseases = await DiseaseService.findHighlighted();
      res.json(diseases);
    } catch (error) {
      console.error('Erro ao buscar doenças em destaque:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Admin routes
  async getAllAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search } = req.query;

      const result = await DiseaseService.findAllWithPagination({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
      });

      res.json({
        diseases: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error('Erro ao buscar doenças (admin):', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const imageFile = req.file; // Agora req.file (singular)

    try {
      const diseaseData = req.body;

      // Se há arquivo, prepara os dados da imagem mas ainda não salva no disco
      if (imageFile) {
        diseaseData.imageFile = {
          buffer: imageFile.buffer,
          originalName: imageFile.originalname,
          mimetype: imageFile.mimetype,
        };
      }

      // Cria a doença (que vai salvar a imagem internamente se não houver erro)
      const result = await DiseaseService.create(diseaseData);

      res.status(201).json({
        message: 'Doença criada com sucesso',
        disease: result.disease,
      });
    } catch (error) {
      console.error('Erro ao criar doença:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const imageFile = req.file;

    try {
      const { id } = req.params;
      const updateData = req.body;

      // Se há arquivo, prepara os dados da imagem
      if (imageFile) {
        updateData.imageFile = {
          buffer: imageFile.buffer,
          originalName: imageFile.originalname,
          mimetype: imageFile.mimetype,
        };
      }

      const updatedDisease = await DiseaseService.update(String(id), updateData);

      if (!updatedDisease) {
        res.status(404).json({ error: 'Doença não encontrada' });
        return;
      }

      res.json({
        message: 'Doença atualizada com sucesso',
        disease: updatedDisease,
      });
    } catch (error) {
      console.error('Erro ao atualizar doença:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await DiseaseService.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ error: 'Doença não encontrada' });
        return;
      }

      res.json({ message: 'Doença deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar doença:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async setHighlight(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isHighlighted, highlightType } = req.body;

      const updatedDisease = await DiseaseService.setHighlight(Number(id), isHighlighted, highlightType);

      if (!updatedDisease) {
        res.status(404).json({ error: 'Doença não encontrada' });
        return;
      }

      res.json({
        message: 'Destaque atualizado com sucesso',
        disease: updatedDisease,
      });
    } catch (error) {
      console.error('Erro ao definir destaque:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
