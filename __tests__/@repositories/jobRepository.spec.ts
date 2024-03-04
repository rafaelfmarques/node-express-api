import { IUpdateJobDto } from "../../src/core/domain/dto/IUpdateJobDto";
import { ICreateJobDto } from "../../src/core/domain/dto/ICreateJobDto";
import { InMemoryJobRepository } from "../../src/core/infra/repositories/InMemoryJobRepository";

describe("InMemoryJobRepository", () => {
  let repository: InMemoryJobRepository;

  beforeEach(() => {
    repository = new InMemoryJobRepository();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should be able to create a draft job", async () => {
    const mockData: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockData);

    expect(repository.databaseInMemory.length).toBe(1);
    expect(repository.databaseInMemory[0].title).toBe(mockData.title);
  });

  it("should be able to update a job", async () => {
    const mockCreate: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockCreate);

    const mockUpdate: IUpdateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      status_job: "archived",
    };
    const job = await repository.updateJob(
      repository.databaseInMemory[0].id,
      mockUpdate,
    );
    expect(job.status_job).toBe(mockUpdate.status_job);
    expect(repository.databaseInMemory.length).toBe(1);
  });

  it("should be able to publish a job", async () => {
    const mockData: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockData);
    const job = await repository.publishJob(repository.databaseInMemory[0].id);

    expect(job.status_job).toBe("published");
  });

  it("should be able to archive a job", async () => {
    const mockData: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockData);
    const job = await repository.archiveJob(repository.databaseInMemory[0].id);

    expect(job.status_job).toBe("archived");
  });

  it("should be able to delete a job", async () => {
    const mockData: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockData);
    await repository.deleteJob(repository.databaseInMemory[0].id);
    expect(repository.databaseInMemory.length).toBe(0);
  });

  it("should be able to return all jobs non published", async () => {
    const mockData: ICreateJobDto = {
      title: "Title",
      description: "Description",
      location: "Location",
      fk_company_id: "CompanyID",
    };

    await repository.createDraftJob(mockData);
    const jobs = await repository.findAllNonPublishedJobs();
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs.every((job) => job.status_job !== "published")).toBe(true);
  });
});
