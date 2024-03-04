import { IGetFeedDto } from "../dto/IGetFeedDto";

export interface ICachingUseCase {
  saveData(data: IGetFeedDto[]): Promise<void>;
  getData(type: "feed"): Promise<IGetFeedDto | []>;
}
