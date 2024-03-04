import { ICreateJobDto } from "@/core/domain/dto/ICreateJobDto";
import { IGetFeedDto } from "@/core/domain/dto/IGetFeedDto";
import { IUpdateJobDto } from "@/core/domain/dto/IUpdateJobDto";
import { IJobEntity } from "@/core/domain/entities";
import { IJobUseCase } from "@/core/domain/use-cases/IJobUseCase";
import { ProducerSQS } from "@/core/infra/aws/message-handler/aws-sqs/producer";
import { StorageS3 } from "@/core/infra/aws/storage/s3/storageS3";
import { NodeCaching } from "@/core/infra/database/node-cache/nodeCache";
import { JobRepository } from "@/core/infra/repositories/JobRepository";
import { getFlaggedCategories } from "@/utils/getFlaggedCategories";

import { OpenAiUseCase } from "./OpenAiUseCase";
import { AppError } from "../exceptions";

export class JobUseCase implements IJobUseCase {
  private caching = new NodeCaching();
  private storage = new StorageS3();
  private queue = new ProducerSQS();
  private openAi = new OpenAiUseCase();

  constructor(private jobRepository: JobRepository) {}

  createDraftJob(data: ICreateJobDto): Promise<IJobEntity> {
    return this.jobRepository.createDraftJob(data);
  }
  async publishJob(id: string): Promise<string> {
    const blocks: string[] = [];
    const isJobValidForPublish = await this.jobRepository.findJobById(id);

    if (isJobValidForPublish?.status_job !== "draft")
      throw new AppError(
        `Cannot publish a job in status ${isJobValidForPublish?.status_job}`,
      );
    const [title, description] = await Promise.all([
      await this.openAi.validationByAI(isJobValidForPublish.title),
      await this.openAi.validationByAI(isJobValidForPublish.description),
    ]);

    if (title.results[0].flagged || description.results[0].flagged) {
      const titleBlockedBy = getFlaggedCategories(title.results[0].categories);
      if (titleBlockedBy) blocks.push(`Título: ${titleBlockedBy}`);

      const descriptionBlockedBy = getFlaggedCategories(
        description.results[0].categories,
      );
      if (descriptionBlockedBy)
        blocks.push(`Descrição: ${descriptionBlockedBy}`);

      await this.jobRepository.rejectJob(isJobValidForPublish.id, blocks);
      throw new AppError("Job recused");
    }
    const jobPublished = await this.jobRepository.publishJob(id);

    this.queue.send(
      {
        id: jobPublished.id,
        title: jobPublished.title,
        description: jobPublished.description,
        company: jobPublished.company.name,
      },
      process.env.AWS_SQS_PUBLISH_JOB,
    );
    return "Job published";
  }

  async updateJob(id: string, data: IUpdateJobDto): Promise<IJobEntity> {
    const isJobExists = await this.jobRepository.findJobById(id);
    if (!isJobExists) throw new AppError("Job not found", 404);
    return this.jobRepository.updateJob(id, data);
  }

  async archiveJob(id: string): Promise<IJobEntity> {
    return await this.jobRepository.archiveJob(id);
  }
  async deleteJob(id: string): Promise<void> {
    const isJobExists = await this.jobRepository.findJobById(id);
    if (isJobExists && isJobExists.status_job === "published")
      this.queue.remove(id, process.env.AWS_SQS_UNPUBLISH_JOB);
    this.jobRepository.deleteJob(id);
  }

  async getCachedFeed(): Promise<IGetFeedDto[]> {
    let feed: any = await this.caching.getData("feed");
    if (!feed?.length) {
      feed = await this.storage.getFileForFeed();
      await this.caching.saveData(feed);
    }
    return feed;
  }

  async findAllNonPublishedJobs(
    status?: "draft" | "archived" | "rejected",
  ): Promise<[] | IJobEntity[]> {
    return this.jobRepository.findAllNonPublishedJobs(status);
  }
}
