import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Base de données connectée');
  } catch (error) {
    console.error('❌ Échec de connexion à la base de données');
    console.error(error);
    process.exit(1); // <<< bloque le build
  } finally {
    await prisma.$disconnect();
  }
}

main();
