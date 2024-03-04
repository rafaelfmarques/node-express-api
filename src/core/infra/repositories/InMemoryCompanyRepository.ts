import { ICompanyEntity } from "@/core/domain/entities";
import { ICompanyRepository } from "@/core/domain/repositories/ICompanyRepository";

interface DatabaseInMemoryProps {
  id: string;
  name: string;
  created_at: Date;
}
export class InMemoryCompanyRepository implements ICompanyRepository {
  public databaseInMemory: Array<DatabaseInMemoryProps> = [
    {
      id: "b8de7400-d9ba-4cdc-8cc5-813213a1ec6d",
      name: "ACME Enterprises",
      created_at: new Date(),
    },
  ];

  async getCompanies(): Promise<ICompanyEntity[]> {
    return this.databaseInMemory;
  }

  async findCompanyById(id: string): Promise<ICompanyEntity | null> {
    return this.databaseInMemory.find((reg) => reg.id === id) ?? null;
  }
}
