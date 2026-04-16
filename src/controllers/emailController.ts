import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';

export class EmailController {
  static async sendWelcome(req: Request, res: Response) {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    try {
      await EmailService.sendWelcomeEmail(email, name);
      res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  }
}
