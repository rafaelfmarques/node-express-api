import { ICompanyEntity } from "../entities";

export interface ICompanyRepository {
  getCompanies(): Promise<ICompanyEntity[]>;
  findCompanyById(id: string): Promise<ICompanyEntity | null>;
}
