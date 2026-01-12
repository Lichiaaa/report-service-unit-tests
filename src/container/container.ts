import { Container } from "inversify";
import { TYPES } from "./types";

import type { ILogger } from "../domain/interfaces/ILogger";
import type { IMailer } from "../domain/interfaces/IMailer";
import type { IReportService } from "../domain/interfaces/IReportService";

import { DevLogger } from "../infrastructure/logger/DevLogger";
import { ProdLogger } from "../infrastructure/logger/ProdLogger";
import { DevMailer } from "../infrastructure/mailer/DevMailer";
import { ProdMailer } from "../infrastructure/mailer/ProdMailer";

import { ReportService } from "../domain/services/ReportService";

export function buildContainer(): Container {
  const container = new Container();

  const env = process.env.APP_ENV ?? "dev";

  // Logger (Singleton)
  if (env === "prod") {
    container.bind<ILogger>(TYPES.Logger).to(ProdLogger).inSingletonScope();
  } else {
    container.bind<ILogger>(TYPES.Logger).to(DevLogger).inSingletonScope();
  }

  // Mailer (Singleton)
  if (env === "prod") {
    container.bind<IMailer>(TYPES.Mailer).to(ProdMailer).inSingletonScope();
  } else {
    container.bind<IMailer>(TYPES.Mailer).to(DevMailer).inSingletonScope();
  }

  // ReportService
  container.bind<IReportService>(TYPES.ReportService).to(ReportService);

  return container;
}
