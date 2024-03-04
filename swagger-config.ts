import swaggerAutogen from "swagger-autogen";
const isProd = process.env.NODE_ENV === "prod";

const doc = {
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentação da API",
  },
  host: isProd ? "roundhouse.proxy.rlwy.net:41996" : "localhost:3000",
};

const outputFile = "swagger-output.json";
const routes = ["./src/routes/**/*.ts"];

swaggerAutogen()(outputFile, routes, doc);
