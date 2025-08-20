import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }, // include products inside each category
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new category
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    // check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    // create new category
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
