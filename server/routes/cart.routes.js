import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


// ➡️ Add item to cart
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // check if user cart exists
    let cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: parseInt(userId) },
      });
    }

    // check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: parseInt(productId),
      },
    });

    let updatedItem;
    if (existingItem) {
      updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) },
      });
    } else {
      updatedItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parseInt(productId),
          quantity: quantity || 1,
        },
      });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Cart POST error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ➡️ Get user cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) return res.json({ message: "Cart is empty" });

    res.json(cart);
  } catch (error) {
    console.error("Cart GET error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ➡️ Checkout cart -> create an order
router.post("/:userId/checkout", async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Get user cart with items + products
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty or not found" });
    }

    // 2. Create a new order
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        status: "PENDING",
      },
    });

    // 3. Add all cart items into OrderItems
    const orderItems = await Promise.all(
      cart.items.map((item) =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price, // snapshot of price at checkout
          },
        })
      )
    );

    // 4. Update product stock
    await Promise.all(
      cart.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );

    // 5. Clear the cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.json({
      message: "Checkout successful",
      order,
      items: orderItems,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default router;
