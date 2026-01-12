import { describe, it, expect, vi } from "vitest";
import { ReportController } from "./ReportController";
import { InvalidReportSizeError } from "../domain/errors/InvalidReportSizeError";

const makeService = () => ({
    generateAndSend: vi.fn(),
});

const makeContainer = (service: any) => ({
    get: vi.fn().mockReturnValue(service),
});

const makeResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn();
    return res;
};

describe("ReportController", () => {
    it("retorna 400 se email não for informado", () => {
        const service = makeService();
        const container = makeContainer(service);
        const controller = new ReportController(container as any);

        const req: any = { params: { n: "2" }, query: {} };
        const res = makeResponse();

        controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("retorna 400 se o domínio lançar InvalidReportSizeError", () => {
        const service = makeService();
        service.generateAndSend.mockImplementation(() => {
            throw new InvalidReportSizeError();
        });

        const container = makeContainer(service);
        const controller = new ReportController(container as any);

        const req: any = { params: { n: "15" }, query: { email: "a@b.com" } };
        const res = makeResponse();

        controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("retorna 500 para erro genérico", () => {
        const service = makeService();
        service.generateAndSend.mockImplementation(() => {
            throw new Error("Database down");
        });

        const container = makeContainer(service);
        const controller = new ReportController(container as any);

        const req: any = { params: { n: "2" }, query: { email: "a@b.com" } };
        const res = makeResponse();

        controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
