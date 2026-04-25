import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main route for testing
app.get('/', (req, res) => {
  res.send('Oh Curio! Backend is running');
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
