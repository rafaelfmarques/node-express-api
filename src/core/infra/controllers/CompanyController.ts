import { AppError } from "@/core/application/exceptions/app-error";
import { ICompanyUseCase } from "@/core/domain/use-cases/ICompanyUseCase";
import { NextFunction, Request, Response } from "express";

export class CompanyController {
  private companyService: ICompanyUseCase;

  constructor(companyService: ICompanyUseCase) {
    this.companyService = companyService;
  }

  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await this.companyService.getCompanies();
      res.send(companies);
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to get companies");
      next(error);
    }
  }
  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.companyService.getCompanyById(req.params.id);
      res.send(company);
    } catch (e: any) {
      const error = new AppError(e?.message ?? "Failed to get company by id");
      next(error);
    }
  }
}
