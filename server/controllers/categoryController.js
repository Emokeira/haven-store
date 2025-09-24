// server/controllers/categoryController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc    Create new category
// @route   POST /api/categories
// @access  Admin
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by id
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Admin
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Admin
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Explicit export block
export { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
};
