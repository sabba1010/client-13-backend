import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main route for testing - with Vercel Web Analytics script
app.get('/', (req, res) => {
  // Serve HTML response with Vercel Web Analytics script injected
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Oh Curio! Backend</title>
      <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      </script>
      <script defer src="/_vercel/insights/script.js"></script>
    </head>
    <body>
      <h1>Oh Curio! Backend is running</h1>
      <p>Vercel Web Analytics is enabled for this deployment.</p>
    </body>
    </html>
  `);
});

// API Routes
app.use('/api/email', emailRoutes);

// Export the app for serverless deployment
export default app;

// Only start the server if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
