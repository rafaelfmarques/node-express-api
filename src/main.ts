require("dotenv").config();
const cors = require("cors");

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import { AppError } from "./core/application/exceptions";
import { errorHandler } from "./core/infra/middlewares/errorHandler";
import { routerCompanies, routerJobs } from "./routes";
import { routerHealth } from "./routes/health";
const app = express();

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(express.json());

  app.use(routerCompanies, routerJobs, routerHealth);
  app.use(
    cors({
      origin: [
        "http://localhost:3000/",
        "http://roundhouse.proxy.rlwy.net:41996/",
      ],
    }),
  );
  app.all("*", (req, _res, next) => {
    const error = new AppError(`Can't find ${req.originalUrl}`, 500);
    next(error);
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

bootstrap();
