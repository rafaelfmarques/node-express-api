import { ICreateJobDto, IUpdateJobDto } from "@/core/domain/dto";
import { IJobEntity } from "@/core/domain/entities";
import { IJobRepository } from "@/core/domain/repositories";

interface DatabaseInMemoryProps {
  id: string;
  title: string;
  description: string;
  location: string;
  notes?: string[];
  status_job: "draft" | "published" | "archived" | "rejected";
  fk_company_id: string;
  created_at: Date;
  updated_at?: Date | null;
}

export class InMemoryJobRepository implements IJobRepository {
  public databaseInMemory: Array<DatabaseInMemoryProps> = [];

  async createDraftJob(data: ICreateJobDto): Promise<IJobEntity> {
    this.databaseInMemory.push({
      ...data,
      id: crypto.randomUUID(),
      status_job: "draft",
      updated_at: null,
      created_at: new Date(),
    });
    return this.databaseInMemory[0];
  }
  async publishJob(id: string): Promise<IJobEntity> {
    const index = this.databaseInMemory.findIndex((data) => data.id === id);

    this.databaseInMemory[index].status_job = "published";
    return this.databaseInMemory[index];
  }
  async archiveJob(id: string): Promise<IJobEntity> {
    const index = this.databaseInMemory.findIndex((data) => data.id === id);

    this.databaseInMemory[index].status_job = "archived";
    return this.databaseInMemory[index];
  }
  async updateJob(id: string, data: IUpdateJobDto): Promise<IJobEntity> {
    const index = this.databaseInMemory.findIndex((data) => data.id === id);
    this.databaseInMemory[index] = { ...this.databaseInMemory[index], ...data };
    return this.databaseInMemory[index];
  }
  async deleteJob(id: string): Promise<void> {
    this.databaseInMemory = this.databaseInMemory.filter(
      (reg) => reg.id !== id,
    );
  }
  async findAllNonPublishedJobs(
    status?: "draft" | "archived" | "rejected",
  ): Promise<IJobEntity[]> {
    const nonPublishedJobs = this.databaseInMemory.filter((job) => {
      if (status) return job.status_job === status;
      return job.status_job !== "published";
    });
    return [...nonPublishedJobs];
  }
}
