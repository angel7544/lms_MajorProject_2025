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

  // Create goals
  const goals = [
    { title: 'Learn a new skill' },
    { title: 'Get a better job' },
    { title: 'Personal growth' },
    { title: 'Career advancement' },
    { title: 'Just for fun' }
  ];

  console.log('Seeding goals...');
  
  for (const goal of goals) {
    await prisma.goal.upsert({
      where: { title: goal.title },
      update: {},
      create: goal,
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