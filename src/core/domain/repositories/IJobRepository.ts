import { ICreateJobDto, IUpdateJobDto } from "../dto";
import { IJobEntity } from "../entities";

export interface IJobRepository {
  createDraftJob(data: ICreateJobDto): Promise<IJobEntity>;
  publishJob(id: string): Promise<IJobEntity>;
  archiveJob(id: string): Promise<IJobEntity>;
  updateJob(id: string, data: IUpdateJobDto): Promise<IJobEntity>;
  deleteJob(id: string): Promise<void>;
  findAllNonPublishedJobs(
    status: "draft" | "archived" | "rejected",
  ): Promise<IJobEntity[]>;
}
