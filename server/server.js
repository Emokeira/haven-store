import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
