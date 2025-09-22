import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../domain/models/User';

interface AuthRequest extends Request {
  user?: User;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Token de acesso requerido' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    // verificar se o usuário mudou a senha após o token ter sido emitido
    if (decoded && decoded.userId) {
      const user = await User.findByPk(decoded.userId);
      if (user) {
        const tokenIssuedAt = (decoded as any).iat; // tempo em segundos
        const lastPasswordChange = user.lastpasswordchange
          ? Math.floor(new Date(user.lastpasswordchange).getTime() / 1000)
          : 0;

        if (lastPasswordChange > tokenIssuedAt) {
          res.status(401).json({ error: 'Token inválido. A senha foi alterada recentemente.' });
          return;
        }
      }
    }
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Usuário não autenticado' });
    return;
  }

  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    res.status(403).json({ error: 'Acesso negado. Privilégios de administrador requeridos' });
    return;
  }

  next();
};

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Usuário não autenticado' });
    return;
  }

  if (req.user.role !== 'super_admin') {
    res.status(403).json({ error: 'Acesso negado. Privilégios de super administrador requeridos' });
    return;
  }

  next();
};
