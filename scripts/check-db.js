// scripts/check-db.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie !');
  } catch (error) {
    console.error('❌ Connexion échouée :', error);
    process.exit(1); // Stop le build
  } finally {
    await prisma.$disconnect();
  }
}

main();
