const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    { title: 'Web Development' },
    { title: 'Mobile Development' },
    { title: 'Data Science' },
    { title: 'Machine Learning' },
    { title: 'Artificial Intelligence' },
    { title: 'Blockchain' },
    { title: 'Cloud Computing' },
    { title: 'DevOps' },
    { title: 'Cybersecurity' },
    { title: 'Game Development' }
  ];

  console.log('Seeding categories...');
  
  for (const category of categories) {
    await prisma.category.upsert({
      where: { title: category.title },
      update: {},
      create: category,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 