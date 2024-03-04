import { ICreateJobDto } from "../dto/ICreateJobDto";
import { IGetFeedDto } from "../dto/IGetFeedDto";
import { IUpdateJobDto } from "../dto/IUpdateJobDto";
import { IJobEntity } from "../entities";

export interface IJobUseCase {
  createDraftJob(data: ICreateJobDto): Promise<IJobEntity>;
  publishJob(id: string): Promise<string>;
  archiveJob(id: string): Promise<IJobEntity>;
  updateJob(id: string, data: IUpdateJobDto): Promise<IJobEntity>;
  deleteJob(id: string): Promise<void>;
  getCachedFeed(): Promise<IGetFeedDto[]>;
  findAllNonPublishedJobs(status?: string): Promise<IJobEntity[]>;
}
