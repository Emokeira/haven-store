import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- 1. Categories ---
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Furniture" },
      update: {},
      create: { name: "Furniture" },
    }),
    prisma.category.upsert({
      where: { name: "Decor" },
      update: {},
      create: { name: "Decor" },
    }),
    prisma.category.upsert({
      where: { name: "Kitchen" },
      update: {},
      create: { name: "Kitchen" },
    }),
    prisma.category.upsert({
      where: { name: "Lighting" },
      update: {},
      create: { name: "Lighting" },
    }),
  ]);

  const categoryMap = {};
  categories.forEach((c) => (categoryMap[c.name] = c.id));

  // --- 2. Users ---
  const passwordHash = await bcrypt.hash("1234", 10);

  const admin = await prisma.user.upsert({
    where: { email: "edith@example.com" },
    update: { isAdmin: true, password: passwordHash },
    create: {
      name: "Edith",
      email: "edith@example.com",
      password: passwordHash,
      isAdmin: true,
    },
  });

  const customers = await Promise.all([
    prisma.user.upsert({
      where: { email: "caleb@example.com" },
      update: { password: passwordHash },
      create: {
        name: "Caleb",
        email: "caleb@example.com",
        password: passwordHash,
        isAdmin: false,
      },
    }),
    prisma.user.upsert({
      where: { email: "meek@example.com" },
      update: { password: passwordHash },
      create: {
        name: "Meek",
        email: "meek@example.com",
        password: passwordHash,
        isAdmin: false,
      },
    }),
    prisma.user.upsert({
      where: { email: "dean@example.com" },
      update: { password: passwordHash },
      create: {
        name: "Dean",
        email: "dean@example.com",
        password: passwordHash,
        isAdmin: false,
      },
    }),
  ]);

  // --- 3. Products ---
  const productsData = [
    {
      name: "Modern Sofa",
      description: "Comfortable 3-seater sofa with grey fabric.",
      price: 550,
      stock: 5,
      categoryId: categoryMap["Furniture"],
      imageUrl: "/assets/products/sofa.jpg",
    },
    {
      name: "Wooden Coffee Table",
      description: "Stylish wooden coffee table for your living room.",
      price: 150.99,
      stock: 10,
      categoryId: categoryMap["Furniture"],
      imageUrl: "/assets/products/coffee-table.jpg",
    },
    {
      name: "Office Chair",
      description: "Ergonomic office chair with adjustable height.",
      price: 220,
      stock: 8,
      categoryId: categoryMap["Furniture"],
      imageUrl: "/assets/products/office-chair.jpg",
    },
    {
      name: "Dining Table Set",
      description: "6-seater wooden dining table with chairs.",
      price: 899.99,
      stock: 3,
      categoryId: categoryMap["Furniture"],
      imageUrl: "/assets/products/dining-table.jpg",
    },
    {
      name: "Wall Mirror",
      description: "Decorative round mirror with golden frame.",
      price: 80,
      stock: 15,
      categoryId: categoryMap["Decor"],
      imageUrl: "/assets/products/wall-mirror.jpg",
    },
    {
      name: "Ceramic Vase",
      description: "Elegant white ceramic vase for flowers.",
      price: 35.5,
      stock: 20,
      categoryId: categoryMap["Decor"],
      imageUrl: "/assets/products/vase.jpg",
    },
    {
      name: "Abstract Wall Art",
      description: "Canvas art piece for modern living spaces.",
      price: 120,
      stock: 7,
      categoryId: categoryMap["Decor"],
      imageUrl: "/assets/products/wall-art.jpg",
    },
    {
      name: "Non-Stick Frying Pan",
      description: "Durable non-stick pan for all cooking needs.",
      price: 25,
      stock: 30,
      categoryId: categoryMap["Kitchen"],
      imageUrl: "/assets/products/frying-pan.jpg",
    },
    {
      name: "Cutlery Set",
      description: "24-piece stainless steel cutlery set.",
      price: 50,
      stock: 25,
      categoryId: categoryMap["Kitchen"],
      imageUrl: "/assets/products/cutlery.jpg",
    },
    {
      name: "Blender",
      description: "High-speed blender for smoothies & sauces.",
      price: 120,
      stock: 10,
      categoryId: categoryMap["Kitchen"],
      imageUrl: "/assets/products/blender.jpg",
    },
    {
      name: "Chandelier",
      description: "Luxury crystal chandelier for dining rooms.",
      price: 499,
      stock: 2,
      categoryId: categoryMap["Lighting"],
      imageUrl: "/assets/products/chandelier.jpg",
    },
    {
      name: "Table Lamp",
      description: "Minimalist table lamp with warm light.",
      price: 45,
      stock: 12,
      categoryId: categoryMap["Lighting"],
      imageUrl: "/assets/products/table-lamp.jpg",
    },
    {
      name: "Wall Sconce",
      description: "Elegant wall-mounted light fixture.",
      price: 70,
      stock: 15,
      categoryId: categoryMap["Lighting"],
      imageUrl: "/assets/products/wall-sconce.jpg",
    },
  ];

  await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });

  // --- 4. Orders (add total!) ---
  const total = 550 + 150.99; // Sofa + Coffee Table

  await prisma.order.create({
    data: {
      userId: customers[0].id,
      status: "PENDING",
      total, // ✅ Added total
      items: {
        create: [
          {
            productId: 1,
            quantity: 1,
            price: 550,
          },
          {
            productId: 2,
            quantity: 1,
            price: 150.99,
          },
        ],
      },
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
