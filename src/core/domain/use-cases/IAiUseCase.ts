export interface IAiUseCase {
  validationByAI(input: string): Promise<any>;
}
