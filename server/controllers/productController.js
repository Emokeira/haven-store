import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Helper: consistent API response
 */
const sendResponse = (res, status, success, data = null, message = null, pagination = null) => {
  const response = { success };
  if (data !== null) response.data = data;
  if (message) response.message = message;
  if (pagination) response.pagination = pagination;
  return res.status(status).json(response);
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, categoryId, featured, isNew } = req.body;

    if (!name || typeof price !== "number" || price <= 0 || typeof stock !== "number" || stock < 0) {
      return sendResponse(res, 400, false, null, "Invalid or missing fields");
    }

    // Optional: verify category exists if categoryId provided
    if (categoryId) {
      const category = await prisma.category.findUnique({ where: { id: parseInt(categoryId, 10) } });
      if (!category) {
        return sendResponse(res, 400, false, null, "Invalid categoryId");
      }
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId, featured, isNew },
    });

    return sendResponse(res, 201, true, product, "Product created successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products (with filters, sorting, pagination)
 * @route   GET /api/products
 */
const getProducts = async (req, res, next) => {
  try {
    const { category, isNew, featured, search, sort, page, limit } = req.query;

    let where = {};
    if (category) where.categoryId = parseInt(category, 10);
    if (isNew) where.isNew = isNew === "true";
    if (featured) where.featured = featured === "true";
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Sorting
    let orderBy = {};
    if (sort === "price_asc") orderBy.price = "asc";
    else if (sort === "price_desc") orderBy.price = "desc";
    else if (sort === "newest") orderBy.createdAt = "desc";
    else orderBy = { createdAt: "desc" };

    // Pagination defaults
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    return sendResponse(res, 200, true, products, null, {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true },
    });

    if (!product) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    return sendResponse(res, 200, true, product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, featured, isNew } = req.body;

    const existing = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existing) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    // Validate category
    if (categoryId) {
      const category = await prisma.category.findUnique({ where: { id: parseInt(categoryId, 10) } });
      if (!category) {
        return sendResponse(res, 400, false, null, "Invalid categoryId");
      }
    }

    // Validate numbers
    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return sendResponse(res, 400, false, null, "Invalid price");
    }
    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
      return sendResponse(res, 400, false, null, "Invalid stock");
    }

    const updated = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, price, stock, categoryId, featured, isNew },
    });

    return sendResponse(res, 200, true, updated, "Product updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existing) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    await prisma.product.delete({ where: { id: parseInt(id, 10) } });

    return sendResponse(res, 200, true, null, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
