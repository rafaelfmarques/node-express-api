export interface IProducerUseCase {
  send(body: any, url?: string): Promise<void>;
  remove(id: string, url?: string): Promise<void>;
}
