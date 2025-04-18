import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') {
  await prisma.$connect(); // vérifie seulement si prod
}

export default prisma;
