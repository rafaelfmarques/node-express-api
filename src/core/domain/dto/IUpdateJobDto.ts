export interface IUpdateJobDto {
  title: string;
  description: string;
  location: string;
  status_job: "draft" | "archived" | "rejected";
}
