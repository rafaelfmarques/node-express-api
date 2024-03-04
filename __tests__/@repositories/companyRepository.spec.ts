import { InMemoryCompanyRepository } from "./../../src/core/infra/repositories/InMemoryCompanyRepository";

describe("InMemoryJobRepository", () => {
  let repository: InMemoryCompanyRepository;

  beforeEach(() => {
    repository = new InMemoryCompanyRepository();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should be able to return all companies", async () => {
    await repository.getCompanies();

    expect(repository.databaseInMemory.length).toBeGreaterThan(0);
  });

  it("should be able to find company by id", async () => {
    const id = "b8de7400-d9ba-4cdc-8cc5-813213a1ec6d";

    const company = await repository.findCompanyById(id);
    expect(company).not.toBeNull();
    if (company) expect(company.id).toBe(id);
  });
});
