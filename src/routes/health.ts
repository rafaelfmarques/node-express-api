import { HealthCheckUseCase } from "@/core/application/protocols/HealthCheckUseCase";
import { HealthCheckController } from "@/core/infra/controllers/HealthCheckController";
import { HealthCheckRepository } from "@/core/infra/repositories/HealthCheckRepository";
import express, { NextFunction, Request, Response } from "express";

const routerHealth = express.Router();
const healthRepo = new HealthCheckRepository();
const healthService = new HealthCheckUseCase(healthRepo);

const healthCheckController = new HealthCheckController(healthService);

routerHealth.get("/", (req: Request, res: Response, next: NextFunction) =>
  healthCheckController.check(req, res, next),
);

export { routerHealth };
