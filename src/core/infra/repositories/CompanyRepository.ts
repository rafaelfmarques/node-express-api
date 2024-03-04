import { ICompanyEntity } from "@/core/domain/entities";
import { ICompanyRepository } from "@/core/domain/repositories/ICompanyRepository";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/postgres/connection";

export class CompanyRepository implements ICompanyRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async findCompanyById(id: string): Promise<ICompanyEntity | null> {
    return await this.prisma.company.findFirst({ where: { id } });
  }
  async getCompanies(): Promise<ICompanyEntity[]> {
    return await this.prisma.company.findMany();
  }
  async getCompanyById(id: string): Promise<ICompanyEntity> {
    return await this.prisma.company.findFirstOrThrow({ where: { id } });
  }
}
