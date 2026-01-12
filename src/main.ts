import "reflect-metadata";
import "dotenv/config";

import express from "express";
import { buildContainer } from "./container/container";
import { ReportController } from "./controller/ReportController";

const app = express();
const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;

const container = buildContainer();
const reportController = new ReportController(container);

app.get("/relatorio/:n", reportController.handle);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
