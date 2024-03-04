import { NextFunction, Request, Response } from "express";
import { createJobDto, statusJobSchema, updateJobDto } from "./dto/JobDto";
import { IJobUseCase } from "@/core/domain/use-cases/IJobUseCase";
import { AppError } from "@/core/application/exceptions/app-error";

export class JobController {
  private jobService: IJobUseCase;

  constructor(jobService: IJobUseCase) {
    this.jobService = jobService;
  }

  async feed(req: Request, res: Response, next: NextFunction) {
    try {
      const feed = await this.jobService.getCachedFeed();
      res.status(200).send(feed);
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to get feed", 500);
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status ?? "";
      const statusSchema = statusJobSchema().parse(status);

      const all = await this.jobService.findAllNonPublishedJobs(statusSchema);
      res.status(200).send(all);
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to get companies", 500);
      next(error);
    }
  }

  async createDraftJob(req: Request, res: Response, next: NextFunction) {
    try {
      const createDraftJobSchema = createJobDto();
      const data = createDraftJobSchema.parse(req.body);

      await this.jobService.createDraftJob(data);
      res.status(201).send();
    } catch (e: any) {
      const error = new AppError(
        e?.message ?? "Failed to create draft job",
        500,
      );
      next(error);
    }
  }

  async publishJob(req: Request, res: Response, next: NextFunction) {
    try {
      await this.jobService.publishJob(req.params.id);
      res.status(200).send();
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to publish job");
      next(error);
    }
  }
  async archiveJob(req: Request, res: Response, next: NextFunction) {
    try {
      await this.jobService.archiveJob(req.params.id);
      res.status(200).send();
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to archive job");
      next(error);
    }
  }
  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const updateDraftJobSchema = updateJobDto();
      const data = updateDraftJobSchema.parse(req.body);

      await this.jobService.updateJob(req.params.id, data);
      res.status(200).send();
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to update job");
      next(error);
    }
  }
  async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
      await this.jobService.deleteJob(req.params.id);
      res.status(200).send();
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to delete job");
      next(error);
    }
  }
}
