import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create order (checkout) - protected
router.post("/", protect, createOrder);

// Get user orders - protected
router.get("/:userId", protect, getUserOrders);

// Update order status - admin only
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
