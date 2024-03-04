import { ICreateJobDto } from "@/core/domain/dto/ICreateJobDto";
import { IUpdateJobDto } from "@/core/domain/dto/IUpdateJobDto";
import { IJobEntity } from "@/core/domain/entities";
import { IJobQueue } from "@/core/domain/entities/IJobQueue";
import { IJobRepository } from "@/core/domain/repositories/IJobRepository";
import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../database/postgres/connection";

export class JobRepository implements IJobRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async createDraftJob(data: ICreateJobDto): Promise<IJobEntity> {
    return await this.prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        fk_company_id: data.fk_company_id,
        created_at: new Date().toISOString(),
      },
    });
  }
  async updateJob(id: string, data: IUpdateJobDto): Promise<IJobEntity> {
    return await this.prisma.job.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date().toISOString(),
      },
    });
  }

  async deleteJob(id: string): Promise<void> {
    await this.prisma.job.delete({ where: { id } });
  }

  async publishJob(id: string): Promise<IJobQueue> {
    return await this.prisma.job.update({
      where: { id },
      data: { status_job: "published", updated_at: new Date().toISOString() },
      include: {
        company: true,
      },
    });
  }

  async archiveJob(id: string): Promise<IJobEntity> {
    return await this.prisma.job.update({
      where: { id },
      data: { status_job: "archived", updated_at: new Date().toISOString() },
    });
  }
  async findCompanyById(id: string) {
    return await this.prisma.job.findFirst({ where: { id } });
  }
  async findJobById(id: string) {
    return await this.prisma.job.findFirst({ where: { id } });
  }

  async findAllNonPublishedJobs(
    status?: "draft" | "archived" | "rejected",
  ): Promise<IJobEntity[]> {
    const where: any = {
      NOT: {
        status_job: "published",
      },
      ...(status ? { status_job: status } : {}),
    };

    return this.prisma.job.findMany({
      where: where,
    });
  }

  async rejectJob(id: string, notes?: string[]) {
    return await this.prisma.job.update({
      where: { id },
      data: {
        notes: notes,
        status_job: "rejected",
        updated_at: new Date().toISOString(),
      },
    });
  }
}
