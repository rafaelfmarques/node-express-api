-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'published', 'archived', 'rejected');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "status_job" "Status" NOT NULL DEFAULT 'draft',
    "fk_company_id" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_fk_company_id_fkey" FOREIGN KEY ("fk_company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
