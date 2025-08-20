import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: 'name, price, and categoryId are required' });
  }

  try {
    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
