import type { Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service';

export class DoctorController {
  // Public routes
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { specialty } = req.query;

      const doctors = await DoctorService.getAll({
        specialty: specialty as string,
      });

      res.json(doctors);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await DoctorService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas de médicos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const doctor = await DoctorService.getById(Number(id));

      if (!doctor) {
        res.status(404).json({ error: 'Médico não encontrado' });
        return;
      }

      res.json(doctor);
    } catch (error) {
      console.error('Erro ao buscar médico:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async searchBySpecialty(req: Request, res: Response): Promise<void> {
    try {
      const { specialty } = req.query;

      if (!specialty) {
        res.status(400).json({ error: 'Especialidade é obrigatória' });
        return;
      }

      const doctors = await DoctorService.searchBySpecialty(specialty as string);

      res.json(doctors);
    } catch (error) {
      console.error('Erro ao buscar médicos por especialidade:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Admin routes
  async getAllAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search, specialty } = req.query;

      const result = await DoctorService.getAllAdmin({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        specialty: specialty as string,
      });

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar médicos (admin):', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const doctorData = req.body;

      const doctor = await DoctorService.create(doctorData);

      res.status(201).json({
        message: 'Médico criado com sucesso',
        doctor,
      });
    } catch (error) {
      console.error('Erro ao criar médico:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const doctor = await DoctorService.update(Number(id), updateData);

      if (!doctor) {
        res.status(404).json({ error: 'Médico não encontrado' });
        return;
      }

      res.json({
        message: 'Médico atualizado com sucesso',
        doctor,
      });
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await DoctorService.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ error: 'Médico não encontrado' });
        return;
      }

      res.json({ message: 'Médico deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar médico:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
