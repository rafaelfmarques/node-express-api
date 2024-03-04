export interface IHealthCheckUseCase {
  getDatabaseConnection(): Promise<any>;
}
