import { AppError } from "@/core/application/exceptions";
import { HealthCheckRepository } from "../repositories/HealthCheckRepository";
import { NextFunction, Request, Response } from "express";
import { IHealthCheckUseCase } from "@/core/domain/use-cases/IHealthCheckUseCase";

export class HealthCheckController {
  private healthUseCase: IHealthCheckUseCase;

  constructor(healthService: IHealthCheckUseCase) {
    this.healthUseCase = healthService;
  }

  public async check(_req: Request, res: Response, _next: NextFunction) {
    try {
      const healthDb = await this.healthUseCase.getDatabaseConnection();
      if (healthDb && healthDb[0].now) {
        res.send({
          uptime: process.uptime(),
          message: { db: "OK" },
          timestamp: Date.now(),
        });
      } else
        res.send({
          uptime: process.uptime(),
          message: { db: "DOWN" },
          timestamp: Date.now(),
        });
    } catch (error: any) {
      console.log(error);
      throw new AppError("Health check failed");
    }
  }
}
