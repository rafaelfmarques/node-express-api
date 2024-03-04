import { Request, Response } from "express";
import { ICompanyUseCase } from "../../src/core/domain/use-cases/ICompanyUseCase";
import { CompanyController } from "../../src/core/infra/controllers/CompanyController";

describe("CompanyController", () => {
  let companyController: CompanyController;
  let mockCompanyService: ICompanyUseCase;

  beforeEach(() => {
    mockCompanyService = {
      getCompanies: jest.fn(),
      getCompanyById: jest.fn(),
    };

    companyController = new CompanyController(mockCompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("companies", () => {
    it("should return companies", async () => {
      const mockCompanies = [
        {
          id: "id",
          name: "Company",
          created_at: "2024-02-14T00:00:00.000Z",
          updated_at: null,
        },
      ];

      (mockCompanyService.getCompanies as jest.Mock).mockResolvedValue(
        mockCompanies,
      );
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await companyController.getCompanies(mockRequest, mockResponse);

      expect(mockCompanyService.getCompanies).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith(mockCompanies);
    });
  });

  describe("getCompanyById", () => {
    it("should return a company by id", async () => {
      const mockCompany = {
        id: "id",
        name: "Company",
        created_at: "2024-02-14T00:00:00.000Z",
        updated_at: null,
      };

      (mockCompanyService.getCompanyById as jest.Mock).mockResolvedValue(
        mockCompany,
      );

      const mockRequest = { params: { id: "guid" } } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await companyController.getCompanyById(mockRequest, mockResponse);

      expect(mockCompanyService.getCompanyById).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith(mockCompany);
    });
  });
});
