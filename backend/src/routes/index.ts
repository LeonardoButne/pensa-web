import { Router } from 'express';
import authRoutes from './auth.routes';
import publicRoutes from './public.routes';
import adminRoutes from './admin.routes';

const router = Router();

// Registrar todas as rotas
router.use('/auth', authRoutes);
router.use('/api', publicRoutes);
router.use('/admin', adminRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'PENSA WEB API',
  });
});

export default router;
