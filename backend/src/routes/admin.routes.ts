import { Router } from 'express';
import { DiseaseController } from '../controllers/disease.controller';
import { DoctorController } from '../controllers/doctor.controller';
import { ContactController } from '../controllers/contact.controller';
import { NewsletterController } from '../controllers/newsletter.controller';
import { validateRequest, diseaseValidationRules, doctorValidationRules } from '../middlewares/validation.middleware';
import { authenticateToken, requireAdmin } from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';
import multerConfig, { processImage } from '../middlewares/upload.middleware';
import multer from 'multer';

const router = Router();
const userController = new UserController();
const diseaseController = new DiseaseController();
const doctorController = new DoctorController();
const contactController = new ContactController();
const newsletterController = new NewsletterController();

const upload = multer(multerConfig);

router.use(authenticateToken);
router.use(requireAdmin);

router.post('/create-admin', authenticateToken, userController.createAdmin);

// Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const contactStats = await contactController.getStats(req, res);
    const newsletterStats = await newsletterController.getStats(req, res);
    const diseaseStats = await diseaseController.getStats(req, res);
    const doctorStats = await doctorController.getStats(req, res);

    const stats = {
      contacts: contactStats,
      newsletter: newsletterStats,
      diseases: diseaseStats,
      doctors: doctorStats,
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// Gestão de Doenças
router.get('/diseases', diseaseController.getAllAdmin);
router.post(
  '/diseases',
  upload.single('image'),
  processImage,
  validateRequest(diseaseValidationRules),
  diseaseController.create,
);
router.put('/diseases/:id', upload.single('image'), processImage, diseaseController.update);
router.delete('/diseases/:id', diseaseController.delete);
router.put('/diseases/:id/highlight', diseaseController.setHighlight);
router.get('/diseases/stats', diseaseController.getStats);

// Gestão de Médicos
router.get('/doctors', doctorController.getAllAdmin);
router.post(
  '/doctors',
  upload.single('image'),
  processImage,
  validateRequest(doctorValidationRules),
  doctorController.create,
);
router.put(
  '/doctors/:id',
  upload.single('image'),
  processImage,
  validateRequest(doctorValidationRules),
  doctorController.update,
);
router.delete('/doctors/:id', doctorController.delete);
router.get('/doctors/stats', doctorController.getStats);

// Gestão de Contatos
router.get('/contacts', contactController.getAll);
router.put('/contacts/:id/read', contactController.markAsRead);
router.delete('/contacts/:id', contactController.delete);
router.get('/contacts/stats', contactController.getStats);

// Gestão de Newsletter
router.get('/newsletter', newsletterController.getAll);
router.delete('/newsletter/:id', newsletterController.delete);
const newsletterSendRules = [
  { field: 'subject', required: true, type: 'string' as const, minLength: 5 },
  { field: 'content', required: true, type: 'string' as const, minLength: 10 },
];
router.post('/newsletter/send', validateRequest(newsletterSendRules), newsletterController.sendNewsletter);
router.get('/newsletter/stats', newsletterController.getStats);

router.delete('/upload/:filename', (req, res) => {
  const fs = require('fs');
  const path = require('path');

  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads', filename);

  fs.unlink(filePath, (err: any) => {
    if (err) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    res.json({ message: 'Arquivo deletado com sucesso' });
  });
});

export default router;
