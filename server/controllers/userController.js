import prisma from "../config/prisma.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
