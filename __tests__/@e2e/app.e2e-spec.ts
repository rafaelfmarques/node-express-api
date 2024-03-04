import express from "express";
import request from "supertest";
import { routerCompanies, routerJobs } from "../../src/routes";

const app = express();
app.use(express.json());
app.use(routerCompanies, routerJobs);

describe("[e2e] Create Job", () => {
  it("should be able to create a job", async () => {
    return await request(app)
      .post("/job")
      .send({
        title: "Atendente de Farmácia",
        description: "Descrição do trabalho",
        location: "São Paulo - SP",
        fk_company_id: "e4b174c0-a3f1-45bd-8daf-d3f1b9d4c83b",
      })
      .expect(201);
  });
});

describe("[e2e] Get Companies", () => {
  it("should be able to get companies", async () => {
    return await request(app).get("/companies").send().expect(200);
  });
});

describe("[e2e] Get Feed", () => {
  it("should be able to get feed", async () => {
    return await request(app).get("/feed").send().expect(200);
  });
});
