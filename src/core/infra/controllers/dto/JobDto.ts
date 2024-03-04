import { z } from "zod";

export const createJobDto = () => {
  return z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    status: z.string().default("draft"),
    fk_company_id: z.string(),
  });
};

export const updateJobDto = () => {
  const VALUES = ["draft", "archived", "rejected"] as const;

  return z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    status_job: z.enum(VALUES),
    fk_company_id: z.string(),
  });
};
export const statusJobSchema = () => {
  const VALUES = ["draft", "archived", "rejected", ""] as const;

  return z.enum(VALUES);
};
