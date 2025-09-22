import type { Request, Response } from 'express';
import { NewsletterService } from '../services/newsletter.service';

export class NewsletterController {
  // Public routes
  async subscribe(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const result = await NewsletterService.subscribe(email);

      if (result.alreadySubscribed) {
        res.status(400).json({ error: 'Este email já está inscrito na newsletter' });
        return;
      }

      if (result.reactivated) {
        res.json({ message: 'Inscrição reativada com sucesso!' });
        return;
      }

      res.status(201).json({
        message: 'Inscrição realizada com sucesso! Obrigado por se inscrever na nossa newsletter.',
        subscription: {
          id: result.subscription!.id,
          email: result.subscription!.email,
          subscribedAt: result.subscription!.subscribedAt,
        },
      });
    } catch (error) {
      console.error('Erro ao inscrever na newsletter:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async unsubscribe(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const unsubscribed = await NewsletterService.unsubscribe(email);

      if (!unsubscribed) {
        res.status(404).json({ error: 'Email não encontrado ou já cancelado' });
        return;
      }

      res.json({ message: 'Inscrição cancelada com sucesso' });
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Admin routes
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search, isActive } = req.query;

      const result = await NewsletterService.getAll({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      });

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await NewsletterService.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ error: 'Inscrição não encontrada' });
        return;
      }

      res.json({ message: 'Inscrição removida com sucesso' });
    } catch (error) {
      console.error('Erro ao remover inscrição:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await NewsletterService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async sendNewsletter(req: Request, res: Response): Promise<void> {
    try {
      const { subject, content } = req.body;

      await NewsletterService.sendNewsletter({ subject, content });

      res.json({ message: 'Newsletter enviada com sucesso' });
    } catch (error) {
      console.error('Erro ao enviar newsletter:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
