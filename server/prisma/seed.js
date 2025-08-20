import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const furniture = await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: { name: 'Furniture' },
  });

  const decor = await prisma.category.upsert({
    where: { name: 'Decor' },
    update: {},
    create: { name: 'Decor' },
  });

  const kitchen = await prisma.category.upsert({
    where: { name: 'Kitchen' },
    update: {},
    create: { name: 'Kitchen' },
  });

  // Insert sample products with relations
  await prisma.product.create({
    data: {
      name: 'Wooden Coffee Table',
      description: 'A stylish wooden coffee table for your living room.',
      price: 150.99,
      stock: 10,
      categoryId: furniture.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Modern Sofa',
      description: 'Comfortable 3-seater sofa with grey fabric.',
      price: 550.0,
      stock: 5,
      categoryId: furniture.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Wall Mirror',
      description: 'Decorative round mirror with golden frame.',
      price: 80.0,
      stock: 15,
      categoryId: decor.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Ceramic Vase',
      description: 'Elegant white ceramic vase for flowers.',
      price: 35.5,
      stock: 20,
      categoryId: decor.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Non-Stick Frying Pan',
      description: 'Durable non-stick pan for all cooking needs.',
      price: 25.0,
      stock: 30,
      categoryId: kitchen.id,
    },
  });

  console.log('✅ Seeding complete!');
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
