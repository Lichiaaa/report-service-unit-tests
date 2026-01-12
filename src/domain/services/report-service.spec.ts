import { ReportService } from "./ReportService";
import { InvalidReportSizeError } from "../errors/InvalidReportSizeError";
//interfaces
import type { ILogger } from "../interfaces/ILogger";
import type { IMailer } from "../interfaces/IMailer";

import { describe, it, expect, vi } from "vitest";

describe("ReportService", () => {
    const makeLogger = (): ILogger => ({
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    });

    const makeMailer = (): IMailer => ({
        send: vi.fn(),
    });

    it("deve lançar InvalidReportSizeError quando n for inválido", async () => {
        const logger = makeLogger();
        const mailer = makeMailer();
        const service = new ReportService(logger, mailer);

        expect(() => service.generateAndSend("a@b.com", 15)).toThrowError(
            "Invalid report size"
        );

        expect(() => service.generateAndSend("a@b.com", -5)).toThrowError(
            "Invalid report size"
        );
    });

    it("deve chamar mailer.send no cenário de sucesso", async () => {
        const logger = makeLogger();
        const mailer = makeMailer();
        const service = new ReportService(logger, mailer);

        await service.generateAndSend("destino@email.com", 2);

        expect(mailer.send).toHaveBeenCalled();
        expect(mailer.send).toHaveBeenCalledWith("destino@email.com", expect.any(String), expect.any(String));
    });
});
