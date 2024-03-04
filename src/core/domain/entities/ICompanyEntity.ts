import { BaseEntity } from "./baseEntity";

export type ICompanyEntity = BaseEntity & {
  id: string;
  name: string;
};
