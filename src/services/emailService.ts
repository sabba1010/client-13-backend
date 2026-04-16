import { transporter, mailOptions } from '../config/mailConfig';
import { welcomeEmailTemplate } from '../templates/welcomeEmail';

export class EmailService {
  static async sendWelcomeEmail(to: string, name: string) {
    const html = welcomeEmailTemplate(name);
    
    const info = await transporter.sendMail({
      ...mailOptions,
      to,
      subject: 'Welcome to Oh Curio! Pilot Program',
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return info;
  }
}
