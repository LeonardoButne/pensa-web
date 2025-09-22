import { Contact } from '../domain/models/Contact';
import { Op } from 'sequelize';

export interface ContactPaginationOptions {
  page: number;
  limit: number;
  search?: string;
  isRead?: boolean;
}

export interface ContactPaginationResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ContactService {
  static async create(data: any): Promise<Contact> {
    return await Contact.create(data);
  }

  static async getAll(options: ContactPaginationOptions): Promise<ContactPaginationResult<Contact>> {
    const { page, limit, search, isRead } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { subject: { [Op.like]: `%${search}%` } },
      ];
    }

    if (isRead !== undefined) {
      whereClause.isRead = isRead;
    }

    const { count, rows } = await Contact.findAndCountAll({
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

  static async getById(id: number): Promise<Contact | null> {
    return await Contact.findByPk(id);
  }

  static async findAllWithPagination(options: ContactPaginationOptions): Promise<ContactPaginationResult<Contact>> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await Contact.findAndCountAll({
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

  static async markAsRead(id: number): Promise<Contact | null> {
    const [updatedRows] = await Contact.update({ isRead: true }, { where: { id } });

    if (updatedRows === 0) {
      return null;
    }

    return await Contact.findByPk(id);
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await Contact.destroy({
      where: { id },
    });

    return deletedRows > 0;
  }

  static async getUnreadCount(): Promise<number> {
    return await Contact.count({
      where: { isRead: false },
    });
  }

  static async getStats(): Promise<any> {
    const total = await Contact.count();
    const unread = await Contact.count({ where: { isRead: false } });
    const read = total - unread;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekCount = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: thisWeek,
        },
      },
    });

    return {
      total,
      read,
      unread,
      today: todayCount,
      thisWeek: weekCount,
    };
  }
}
