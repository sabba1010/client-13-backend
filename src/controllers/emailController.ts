import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';
import { trackEvent } from '../utils/analytics';

export class EmailController {
  static async sendWelcome(req: Request, res: Response) {
    const { email, name, library, message } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    try {
      await EmailService.sendWelcomeEmail(email, name, library || '', message || '');
      
      // Track successful email send event with Vercel Analytics
      await trackEvent('Email Sent', {
        type: 'welcome',
        hasLibrary: !!library,
        hasMessage: !!message,
      }, req);
      
      res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Track failed email attempt
      await trackEvent('Email Failed', {
        type: 'welcome',
        error: error.message,
      }, req);
      
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  }
}
