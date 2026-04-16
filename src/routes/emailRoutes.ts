import { Router } from 'express';
import { EmailController } from '../controllers/emailController';

const router = Router();

router.post('/send-welcome', EmailController.sendWelcome);

export default router;
