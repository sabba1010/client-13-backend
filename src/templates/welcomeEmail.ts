export const welcomeEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Oh Curio!</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.025em;
      text-decoration: none;
    }
    .content {
      padding: 40px;
      color: #1e293b;
      line-height: 1.6;
    }
    .greeting {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #0f172a;
    }
    .text {
      font-size: 16px;
      margin-bottom: 24px;
    }
    .footer {
      padding: 24px;
      text-align: center;
      background-color: #f1f5f9;
      color: #64748b;
      font-size: 14px;
    }
    .social-links {
      margin-top: 16px;
    }
    .social-link {
      margin: 0 8px;
      text-decoration: none;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Oh Curio!</div>
    </div>
    <div class="content">
      <div class="greeting">Hi ${name},</div>
      <p class="text">
        Thank you for applying to the Oh Curio! pilot program. We've received your application and will be in touch personally within a few days to schedule your onboarding conversation.
      </p>
      <p class="text">
        In the meantime feel free to explore the site at <a href="https://ohcurioapp.com" style="color: #6366f1; text-decoration: none;">ohcurioapp.com</a>.
      </p>
      <p class="text" style="margin-top: 32px; color: #64748b;">
        - Ty Howard, Founder, Oh Curio!
      </p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Oh Curio! All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/OhCurioApp" class="social-link">Instagram</a>
        <a href="https://linkedin.com/in/ty-howard" class="social-link">LinkedIn</a>
      </div>
    </div>
  </div>
</body>
</html>
`;
