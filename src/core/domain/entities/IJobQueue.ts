import { IJobEntity } from "./IJobEntity";
import { BaseEntity } from "./baseEntity";

export type IJobQueue = BaseEntity &
  IJobEntity & {
    company: {
      name: string;
    };
  };
