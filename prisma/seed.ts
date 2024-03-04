import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COMPANIES = [
  { id: "e4b174c0-a3f1-45bd-8daf-d3f1b9d4c83b", name: "ABC Corp" },
  { id: "c17d6a15-8c40-42c6-8bff-a393fe184401", name: "XYZ LLC" },
  { id: "b8de7400-d9ba-4cdc-8cc5-813213a1ec6d", name: "ACME Enterprises" },
];

async function seedCompany() {
  await prisma.company.createMany({ data: COMPANIES, skipDuplicates: true });
}

seedCompany();
