import { ICompanyEntity } from "@/core/domain/entities";
import { ICompanyUseCase } from "@/core/domain/use-cases/ICompanyUseCase";
import { CompanyRepository } from "@/core/infra/repositories/CompanyRepository";

export class CompanyUseCase implements ICompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  getCompanies(): Promise<ICompanyEntity[]> {
    return this.companyRepository.getCompanies();
  }
  getCompanyById(id: string): Promise<ICompanyEntity | null> {
    return this.companyRepository.getCompanyById(id);
  }
}
