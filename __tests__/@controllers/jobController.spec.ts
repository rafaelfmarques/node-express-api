import { IJobUseCase } from "../../src/core/domain/use-cases/IJobUseCase";
import { JobController } from "../../src/core/infra/controllers/JobController";
import { Request, Response } from "express";

describe("JobController", () => {
  let jobController: JobController;
  let mockJobService: IJobUseCase;

  beforeEach(() => {
    mockJobService = {
      getCachedFeed: jest.fn(),
      createDraftJob: jest.fn(),
      publishJob: jest.fn(),
      archiveJob: jest.fn(),
      updateJob: jest.fn(),
      deleteJob: jest.fn(),
      findAllNonPublishedJobs: jest.fn(),
    };

    jobController = new JobController(mockJobService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to return cached feed", async () => {
    const mockFeed = [
      {
        id: ":id",
        title: "Title",
        description: "Description",
        company: "Company name",
      },
    ];

    (mockJobService.getCachedFeed as jest.Mock).mockResolvedValue(mockFeed);

    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.feed(mockRequest, mockResponse);

    expect(mockJobService.getCachedFeed).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(mockFeed);
  });

  it("should be able to return all jobs in status different of published", async () => {
    const mockAll = [
      {
        id: ":id",
        title: "Gerente de Projetos",
        description:
          "Estamos contratando um gerente de projetos para liderar equipes e garantir a entrega de projetos dentro do prazo e orçamento estabelecidos.",
        location: "Belo Horizonte/MG",
        notes: [],
        status_job: "archived",
        fk_company_id: ":fk_company_id",
        created_at: "2024-02-19T00:00:00.000Z",
        updated_at: null,
      },
    ];

    (mockJobService.findAllNonPublishedJobs as jest.Mock).mockResolvedValue(
      mockAll,
    );

    const mockRequest = { query: {} } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.findAll(mockRequest, mockResponse);

    expect(mockJobService.findAllNonPublishedJobs).toHaveBeenCalledWith("");
    expect(mockResponse.send).toHaveBeenCalledWith(mockAll);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it("should be able to create a draft job", async () => {
    const mockData = {
      title: "Title",
      description: "Description",
      location: "City/State",
      fk_company_id: "id",
    };
    (mockJobService.createDraftJob as jest.Mock).mockResolvedValue(mockData);

    const mockRequest = { body: mockData } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.createDraftJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should be able to publish a draft job", async () => {
    const mockData = { status: 200 };

    (mockJobService.publishJob as jest.Mock).mockResolvedValue(mockData);

    const mockRequest = { params: { id: "guid" } } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.publishJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should archive a job", async () => {
    const mockData = { status: 200 };

    (mockJobService.archiveJob as jest.Mock).mockResolvedValue(mockData);

    const mockRequest = { params: { id: "guid" } } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.archiveJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should be able to delete a job", async () => {
    const mockData = { status: 200 };

    (mockJobService.deleteJob as jest.Mock).mockResolvedValue(mockData);

    const mockRequest = { params: { id: "guid" } } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.deleteJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should be able to update a draft job", async () => {
    const mockData = {
      title: "Title",
      description: "Description",
      location: "City/State",
      fk_company_id: "id",
      status_job: "archived",
    };
    (mockJobService.updateJob as jest.Mock).mockResolvedValue(mockData);

    const mockRequest = {
      params: { id: "guid" },
      body: mockData,
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await jobController.updateJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
