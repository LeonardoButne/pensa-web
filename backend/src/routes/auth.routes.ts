import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { authenticateToken } from '../middlewares/auth.middleware';
import { bootstrapRules, loginRules } from '../validations/auth.rules';
import { passwordChangeRules, userUpdateRules } from '../validations/user.rules';

const router = Router();
const authController = new AuthController();
const userController = new UserController();

// Bootstrap route (create first super admin)
router.post('/bootstrap', validateRequest(bootstrapRules), userController.bootstrap);

// Rotas de autenticação
router.post('/login', validateRequest(loginRules), authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.get('/me', authenticateToken, authController.getUser);
router.put('/profile', authenticateToken, validateRequest(userUpdateRules), authController.updateProfile);
router.put('/change-password', authenticateToken, validateRequest(passwordChangeRules), authController.changePassword);

export default router;
