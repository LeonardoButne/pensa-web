import bcrypt from 'bcryptjs';
import { User } from '../domain/models/User';
import { Op } from 'sequelize';

export class UserService {
  static async createAdmin(data: { name: string; email: string; password: string; role: 'admin' | 'super_admin' }) {
    const { name, email, password, role } = data;

    // Validate role
    if (!['admin', 'super_admin'].includes(role)) {
      throw new Error('Role inválida');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // Now properly typed
      isActive: true,
    });

    return user;
  }

  static async createSuperAdmin(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create super admin
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
    });

    return user;
  }

  static async findSuperAdmin() {
    return await User.findOne({ where: { role: 'super_admin' } });
  }

  static async getAllUsers(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (search) {
      whereClause[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }, { email: { [Op.iLike]: `%${search}%` } }];
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      users: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  static async updateUserRole(userId: number, role: 'admin' | 'super_admin') {
    if (!['admin', 'super_admin'].includes(role)) {
      throw new Error('Role inválida');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    user.role = role; // Now properly typed
    await user.save();

    return user;
  }

  static async toggleUserStatus(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    user.isActive = !user.isActive;
    await user.save();

    return user;
  }

  static async getStats() {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { isActive: true } });
    const inactiveUsers = await User.count({ where: { isActive: false } });
    const admins = await User.count({ where: { role: 'admin' } });
    const superAdmins = await User.count({ where: { role: 'super_admin' } });

    return {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      admins,
      superAdmins,
    };
  }
}
