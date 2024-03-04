export interface IHealthCheckRepository {
  onHealthCheck(): Promise<any>;
}
