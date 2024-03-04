import { IHealthCheckRepository } from "@/core/domain/repositories/IHealthCheckRepository";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../database";

export class HealthCheckRepository implements IHealthCheckRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  onHealthCheck(): Promise<any> {
    return this.prisma.$queryRaw`SELECT now() as now`;
  }
}
