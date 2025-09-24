import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc   Create new product
// @route  POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!name || !price || stock == null) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all products
// @route  GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ include: { category: true } });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single product
// @route  GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc   Update product
// @route  PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const existing = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updated = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, price, stock, categoryId },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete product
// @route  DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await prisma.product.delete({ where: { id: parseInt(id, 10) } });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Explicit export block for Node ESM
export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
