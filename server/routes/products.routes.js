// server/routes/products.routes.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  res.json(products);
});

// Get single product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  });
  res.json(product);
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stock, categoryId },
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
