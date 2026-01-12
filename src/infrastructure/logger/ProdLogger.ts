import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import type { ILogger } from "../../domain/interfaces/ILogger";

import { injectable } from "inversify";

@injectable()
export class ProdLogger implements ILogger {
    private logger: WinstonLogger;

    constructor() {
        this.logger = createLogger({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.json()
            ),transports: [new transports.File({ filename: "app.log" })],
        });
    }

    info(msg: string): void {
        this.logger.info(msg);
    }

    warn(msg: string): void {
        this.logger.warn(msg);
    }

    error(msg: string): void {
        this.logger.error(msg);
    }
}