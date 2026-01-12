import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import { ILogger } from "../../domain/interfaces/ILogger";

import { injectable } from "inversify";

@injectable()
export class DevLogger implements ILogger {
    private logger: WinstonLogger;

    constructor() {
        this.logger = createLogger({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
            ),transports: [new transports.Console()],
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