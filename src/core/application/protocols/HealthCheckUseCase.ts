import { IHealthCheckUseCase } from "@/core/domain/use-cases/IHealthCheckUseCase";
import { HealthCheckRepository } from "@/core/infra/repositories/HealthCheckRepository";

export class HealthCheckUseCase implements IHealthCheckUseCase {
  constructor(private healthRepo: HealthCheckRepository) {}

  async getDatabaseConnection(): Promise<any> {
    return await this.healthRepo.onHealthCheck();
  }
}
