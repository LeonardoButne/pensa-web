import type { Request, Response } from 'express';
import type { User } from '../domain/models/User';
import { UserService } from '../services/user.service';

interface AuthRequest extends Request {
  user?: User;
}

export class UserController {
  async createAdmin(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, email, password, role } = req.body;

      if (!req.user || req.user.role !== 'super_admin') {
        res.status(403).json({ error: 'Apenas super admins podem criar novos admins' });
        return;
      }

      if (name === undefined || email === undefined || password === undefined || role === undefined) {
        res.status(400).json({ error: 'Campos name, email, password e role devem ser inseridos' });
        return;
      }

      if (role !== 'admin' && role !== 'super_admin') {
        res.status(400).json({ error: 'Role inválida. Deve ser "admin" ou "super_admin"' });
        return;
      }

      const newUser = await UserService.createAdmin({ name, email, password, role });

      res.status(201).json({
        message: 'Admin criado com sucesso',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.isActive,
        },
      });
    } catch (error) {
      console.error('Erro ao criar admin:', error);
      if (error instanceof Error && error.message.includes('já existe')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  async bootstrap(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, bootstrapToken } = req.body;

      // Check if bootstrap token matches environment variable
      if (bootstrapToken !== process.env.BOOTSTRAP_TOKEN) {
        res.status(403).json({ error: 'Token de bootstrap inválido' });
        return;
      }

      // Check if any super admin already exists
      const existingSuperAdmin = await UserService.findSuperAdmin();
      if (existingSuperAdmin) {
        res.status(400).json({ error: 'Super admin já existe no sistema' });
        return;
      }

      const superAdmin = await UserService.createSuperAdmin({ name, email, password });

      res.status(201).json({
        message: 'Super admin criado com sucesso',
        user: {
          id: superAdmin.id,
          name: superAdmin.name,
          email: superAdmin.email,
          role: superAdmin.role,
          isActive: superAdmin.isActive,
        },
      });
    } catch (error) {
      console.error('Erro no bootstrap:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAllUsers(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !['admin', 'super_admin'].includes(req.user.role)) {
        res.status(403).json({ error: 'Acesso negado' });
        return;
      }

      const page = Number.parseInt(req.query.page as string) || 1;
      const limit = Number.parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await UserService.getAllUsers({ page, limit, search });

      res.json(result);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateUserRole(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!req.user || req.user.role !== 'super_admin') {
        res.status(403).json({ error: 'Apenas super admins podem alterar roles' });
        return;
      }

      const updatedUser = await UserService.updateUserRole(Number.parseInt(userId), role);

      res.json({
        message: 'Role atualizada com sucesso',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          isActive: updatedUser.isActive,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async toggleUserStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!req.user || !['admin', 'super_admin'].includes(req.user.role)) {
        res.status(403).json({ error: 'Acesso negado' });
        return;
      }

      const updatedUser = await UserService.toggleUserStatus(Number.parseInt(userId));

      res.json({
        message: `Usuário ${updatedUser.isActive ? 'ativado' : 'desativado'} com sucesso`,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          isActive: updatedUser.isActive,
        },
      });
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !['admin', 'super_admin'].includes(req.user.role)) {
        res.status(403).json({ error: 'Acesso negado' });
        return;
      }

      const stats = await UserService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
