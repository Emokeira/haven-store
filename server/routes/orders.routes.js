// routes/orders.routes.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Create a new order (checkout)
 * Moves items from cart → order, empties cart afterwards
 */
router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. Find user's cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty or not found" });
    }

    // 2. Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    // 3. Clear the cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.json(order);
  } catch (error) {
    console.error("Order POST error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/**
 * Get all orders for a user
 */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: { items: { include: { product: true } } },
    });

    res.json(orders);
  } catch (error) {
    console.error("Order GET error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
