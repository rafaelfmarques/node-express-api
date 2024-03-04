import { IGetFeedDto } from "@/core/domain/dto/IGetFeedDto";
import { ICachingUseCase } from "@/core/domain/use-cases/ICachingUseCase";
import NodeCache from "node-cache";

export class NodeCaching implements ICachingUseCase {
  private cache = new NodeCache();

  async saveData(data: IGetFeedDto[]): Promise<void> {
    this.cache.set("feed", JSON.stringify(data), Number(process.env.CACHE_TTL));
  }
  async getData(type: "feed"): Promise<IGetFeedDto | []> {
    const data: any = await this.cache.get(type);
    if (data) return JSON.parse(data);
    return [];
  }
}
