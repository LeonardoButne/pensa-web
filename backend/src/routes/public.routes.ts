import { Router } from 'express';
import { DiseaseController } from '../controllers/disease.controller';
import { DoctorController } from '../controllers/doctor.controller';
import { ContactController } from '../controllers/contact.controller';
import { NewsletterController } from '../controllers/newsletter.controller';
import { validateRequest, contactValidationRules } from '../middlewares/validation.middleware';

const router = Router();
const diseaseController = new DiseaseController();
const doctorController = new DoctorController();
const contactController = new ContactController();
const newsletterController = new NewsletterController();

// Rotas de Doenças
router.get('/diseases', diseaseController.getAll);
router.get('/diseases/highlighted', diseaseController.getHighlighted);
router.get('/diseases/:id', diseaseController.getById);

// Rotas de Médicos
router.get('/doctors', doctorController.getAll);
router.get('/doctors/search', doctorController.searchBySpecialty);
router.get('/doctors/:id', doctorController.getById);

// Rotas de Contato
router.post('/contact', validateRequest(contactValidationRules), contactController.create);

// Rotas de Newsletter
const newsletterRules = [{ field: 'email', required: true, type: 'email' as const }];
router.post('/newsletter/subscribe', validateRequest(newsletterRules), newsletterController.subscribe);
router.post('/newsletter/unsubscribe', validateRequest(newsletterRules), newsletterController.unsubscribe);

export default router;
