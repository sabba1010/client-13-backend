import { transporter, mailOptions } from '../config/mailConfig';
import { welcomeEmailTemplate } from '../templates/welcomeEmail';
import dotenv from 'dotenv';

dotenv.config();

const notifyEmailTemplate = (
  name: string,
  email: string,
  library: string,
  message: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Pilot Application – Oh Curio!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      color: #fff;
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .header p {
      color: rgba(255,255,255,0.85);
      margin: 6px 0 0;
      font-size: 14px;
    }
    .content {
      padding: 36px 40px;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6366f1;
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      color: #1e293b;
      padding: 12px 16px;
      background: #f1f5f9;
      border-radius: 10px;
      border-left: 3px solid #6366f1;
      word-break: break-word;
    }
    .divider {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 24px 0;
    }
    .footer {
      padding: 20px 40px;
      text-align: center;
      background: #f1f5f9;
      color: #64748b;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Pilot Application Received</h1>
      <p>Oh Curio! Pilot Program</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Applicant Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Library Name</div>
        <div class="value">${library || '—'}</div>
      </div>
      ${message ? `
      <hr class="divider">
      <div class="field">
        <div class="label">Message / Notes</div>
        <div class="value">${message}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
      <p>© ${new Date().getFullYear()} Oh Curio! · Capital Breaks LLC</p>
    </div>
  </div>
</body>
</html>
`;

export class EmailService {
  /**
   * Sends a welcome email to the applicant AND a notification to the admin.
   */
  static async sendWelcomeEmail(
    to: string,
    name: string,
    library: string = '',
    message: string = ''
  ) {
    const notifyTo = process.env.EMAIL_TO;

    // 1. Welcome email → applicant
    const welcomeInfo = await transporter.sendMail({
      ...mailOptions,
      to,
      subject: "You're on the list - Oh Curio!",
      html: welcomeEmailTemplate(name),
    });
    console.log('Welcome email sent to %s | id: %s', to, welcomeInfo.messageId);

    // 2. Notification email → admin (sabbahossain123@gmail.com)
    if (notifyTo) {
      const notifyInfo = await transporter.sendMail({
        ...mailOptions,
        to: notifyTo,
        subject: `New Pilot Application from ${name} – ${library || 'Unknown Library'}`,
        html: notifyEmailTemplate(name, to, library, message),
      });
      console.log('Notification email sent to %s | id: %s', notifyTo, notifyInfo.messageId);
    }

    return welcomeInfo;
  }
}
