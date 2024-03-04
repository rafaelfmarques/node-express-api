import { PrismaClient } from "@prisma/client";

const db = { url: process.env.DATABASE_URL };
const prisma = new PrismaClient({ datasources: { db } });

export { prisma };
