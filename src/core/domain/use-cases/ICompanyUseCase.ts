import { ICompanyEntity } from "../entities";

export interface ICompanyUseCase {
  getCompanies(): Promise<ICompanyEntity[]>;
  getCompanyById(id: string): Promise<ICompanyEntity | null>;
}
