export interface IStorageUseCase<T> {
  getFileForFeed(): Promise<T[]>;
}
