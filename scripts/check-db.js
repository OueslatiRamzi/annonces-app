// scripts/check-db.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie.');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données :', error);
    process.exit(1); // Stoppe le build !
  }
}

main();
