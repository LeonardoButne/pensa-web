import type { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';

export class ContactController {
  // Public route
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, subject, message } = req.body;

      const contact = await ContactService.create({
        name,
        email,
        phone,
        subject,
        message,
      });

      res.status(201).json({
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        contact: {
          id: contact.id,
          name: contact.name,
          subject: contact.subject,
          createdAt: contact.createdAt,
        },
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Admin routes
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search, isRead } = req.query;

      const result = await ContactService.getAll({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
      });

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await ContactService.getById(Number(id));

      if (!contact) {
        res.status(404).json({ error: 'Mensagem não encontrada' });
        return;
      }

      res.json(contact);
    } catch (error) {
      console.error('Erro ao buscar mensagem:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await ContactService.markAsRead(Number(id));

      if (!contact) {
        res.status(404).json({ error: 'Mensagem não encontrada' });
        return;
      }

      res.json({
        message: 'Mensagem marcada como lida',
        contact,
      });
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await ContactService.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ error: 'Mensagem não encontrada' });
        return;
      }

      res.json({ message: 'Mensagem deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await ContactService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
