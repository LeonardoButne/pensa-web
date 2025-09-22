import { Doctor } from '../domain/models/Doctor';
import { Op } from 'sequelize';
import type { PaginationOptions, PaginationResult } from './disease.service';

export class DoctorService {
  static async findAll(): Promise<Doctor[]> {
    return await Doctor.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
    });
  }

  static async getStats(): Promise<{
    total: number;
    active: number;
    specialties: number;
    bySpecialty: Array<{ specialty: string; count: number }>;
  }> {
    const total = await Doctor.count();
    const active = await Doctor.count({ where: { isActive: true } });

    // Get unique specialties count
    const specialtiesResult = await Doctor.findAll({
      attributes: ['specialty'],
      where: { isActive: true },
      group: ['specialty'],
      raw: true,
    });
    const specialties = specialtiesResult.length;

    // Get doctors count by specialty
    const bySpecialtyResult = (await Doctor.findAll({
      attributes: ['specialty', [Doctor.sequelize!.fn('COUNT', Doctor.sequelize!.col('id')), 'count']],
      where: { isActive: true },
      group: ['specialty'],
      order: [[Doctor.sequelize!.fn('COUNT', Doctor.sequelize!.col('id')), 'DESC']],
      raw: true,
    })) as any[];

    const bySpecialty = bySpecialtyResult.map((item) => ({
      specialty: item.specialty,
      count: Number.parseInt(item.count),
    }));

    return {
      total,
      active,
      specialties,
      bySpecialty,
    };
  }

  static async findById(id: number): Promise<Doctor | null> {
    return await Doctor.findOne({
      where: { id, isActive: true },
    });
  }

  static async findBySpecialty(specialty: string): Promise<Doctor[]> {
    return await Doctor.findAll({
      where: {
        isActive: true,
        specialty: { [Op.iLike]: `%${specialty}%` },
      },
      order: [['name', 'ASC']],
    });
  }

  static async findAllWithPagination(options: PaginationOptions): Promise<PaginationResult<Doctor>> {
    const { page, limit, search } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (search) {
      whereClause[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }, { specialty: { [Op.iLike]: `%${search}%` } }];
    }

    const { count, rows } = await Doctor.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
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

  static async create(data: any): Promise<Doctor> {
    return await Doctor.create(data);
  }

  static async update(id: number, data: any): Promise<Doctor | null> {
    const [updatedRows] = await Doctor.update(data, {
      where: { id },
    });

    if (updatedRows === 0) {
      return null;
    }

    return await Doctor.findByPk(id);
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await Doctor.destroy({
      where: { id },
    });

    return deletedRows > 0;
  }

  static async getAll(options: { specialty?: string } = {}): Promise<Doctor[]> {
    const whereClause: any = { isActive: true };

    if (options.specialty) {
      whereClause.specialty = { [Op.iLike]: `%${options.specialty}%` };
    }

    return await Doctor.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
    });
  }

  static async getById(id: number): Promise<Doctor | null> {
    return await Doctor.findOne({
      where: { id, isActive: true },
    });
  }

  static async searchBySpecialty(specialty: string): Promise<Doctor[]> {
    return await Doctor.findAll({
      where: {
        isActive: true,
        specialty: { [Op.iLike]: `%${specialty}%` },
      },
      order: [['name', 'ASC']],
    });
  }

  static async getAllAdmin(options: {
    page: number;
    limit: number;
    search?: string;
    specialty?: string;
  }): Promise<PaginationResult<Doctor>> {
    const { page, limit, search, specialty } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (search || specialty) {
      const conditions = [];
      if (search) {
        conditions.push({ name: { [Op.iLike]: `%${search}%` } }, { email: { [Op.iLike]: `%${search}%` } });
      }
      if (specialty) {
        conditions.push({ specialty: { [Op.iLike]: `%${specialty}%` } });
      }
      whereClause[Op.and] = conditions;
    }

    const { count, rows } = await Doctor.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
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
}
