import express from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/authMiddleware.js"; // import protect

const router = express.Router();
const prisma = new PrismaClient();

// Apply protect middleware to all routes
router.use(protect);

/**
 * Add item to cart
 */
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cartItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (cartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
      });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get user cart
 */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: parseInt(userId) },
      include: { product: true },
    });

    res.json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Remove item from cart
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cartItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Clear user cart
 */
router.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.cartItem.deleteMany({ where: { userId: parseInt(userId) } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
