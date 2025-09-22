import type { Request, Response } from 'express';
import type { User } from '../domain/models/User';
import { AuthService, UserResponse } from '../services/auth.service';

interface AuthRequest extends Request {
  user?: User;
}

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      res.json({
        message: 'Login realizado com sucesso',
        ...result,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      if (error instanceof Error && error.message === 'Credenciais inválidas') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  async getUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const user = await AuthService.getUserById(req.user.id);
      res.json({ user });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // Since we're using stateless JWT, logout is handled on the client side
    // by removing the token from storage
    res.json({ message: 'Logout realizado com sucesso' });
  }

  async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!req.user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      await AuthService.changePassword(req.user.id, { currentPassword, newPassword });

      res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      if (error instanceof Error && error.message === 'Senha atual incorreta') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }
  async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (!req.user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const updatedUser = await AuthService.updateProfile(req.user.id, { name, email });

      const userResponse: UserResponse = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      };

      res.json({ message: 'Perfil atualizado com sucesso', user: userResponse });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      if (error instanceof Error && error.message === 'Email já em uso') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }
}
