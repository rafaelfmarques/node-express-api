import { JobUseCase } from "@/core/application/protocols/JobUseCase";
import { JobController } from "@/core/infra/controllers/JobController";
import { JobRepository } from "@/core/infra/repositories/JobRepository";
import express from "express";

const routerJobs = express.Router();
const jobRepository = new JobRepository();
const jobService = new JobUseCase(jobRepository);
const jobController = new JobController(jobService);

routerJobs.get("/jobs/not-published", (req, res, next) => {
  /*  #swagger.parameters['status'] = {
            in: 'query',
            type: 'string'
    } */
  return jobController.findAll(req, res, next);
});

routerJobs.get("/feed", (req, res, next) => jobController.feed(req, res, next));
routerJobs.post("/job", (req, res, next) =>
  /*
    #swagger.parameters['createJob'] = {
        in: 'body',
        required: true,
        schema: {
            $title: 'Desenvolvedor FullStack',
            $description: 'Procuramos um desenvolvedor Full Stack apaixonado por tecnologia para integrar nossa equipe e contribuir com o desenvolvimento de soluções inovadoras.',
            $location: 'São Paulo/SP',
            $fk_company_id: "e4b174c0-a3f1-45bd-8daf-d3f1b9d4c83b"
        }
    }
*/
  jobController.createDraftJob(req, res, next),
);
routerJobs.put("/job/:id", (req, res, next) =>
  /*
    #swagger.parameters['updateJob'] = {
        in: 'body',
        required: true,
        schema: {
            $title: 'Desenvolvedor FullStack',
            $description: 'Procuramos um desenvolvedor Full Stack apaixonado por tecnologia para integrar nossa equipe e contribuir com o desenvolvimento de soluções inovadoras.',
            $location: 'São Paulo/SP',
            $status_job: 'draft',
            $fk_company_id: "e4b174c0-a3f1-45bd-8daf-d3f1b9d4c83b"
        }
    }
*/
  jobController.updateJob(req, res, next),
);
routerJobs.put("/job/:id/publish", (req, res, next) =>
  jobController.publishJob(req, res, next),
);
routerJobs.put("/job/:id/archive", (req, res, next) =>
  jobController.archiveJob(req, res, next),
);
routerJobs.delete("/job/:id", (req, res, next) =>
  jobController.deleteJob(req, res, next),
);

export { routerJobs };
