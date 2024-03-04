import express from "express";
import { CompanyUseCase } from "../core/application/protocols/CompanyUseCase";
import { CompanyRepository } from "../core/infra/repositories/CompanyRepository";
import { CompanyController } from "../core/infra/controllers/CompanyController";

const routerCompanies = express.Router();

const companyRepo = new CompanyRepository();
const companyService = new CompanyUseCase(companyRepo);
const companyController = new CompanyController(companyService);

routerCompanies.get("/companies", (req, res, next) =>
  companyController.getCompanies(req, res, next),
);
routerCompanies.get("/companies/:id", (req, res, next) =>
  companyController.getCompanyById(req, res, next),
);

export { routerCompanies };
