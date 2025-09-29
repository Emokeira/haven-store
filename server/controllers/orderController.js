import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc   Create new order (checkout)
// @route  POST /api/orders
const createOrder = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
        total: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.cartItem.deleteMany({ where: { userId } });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc   Get user orders
// @route  GET /api/orders/:userId
const getUserOrders = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { items: { include: { product: true } } },
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc   Update order status (admin)
// @route  PUT /api/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ✅ Explicit exports
export { createOrder, getUserOrders, updateOrderStatus };
