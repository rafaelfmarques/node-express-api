import { BaseEntity } from "./baseEntity";

export type IJobEntity = BaseEntity & {
  id: string;
  title: string;
  description: string;
  location: string;
  notes?: string[] | null;
  status_job: "draft" | "published" | "archived" | "rejected";
};
