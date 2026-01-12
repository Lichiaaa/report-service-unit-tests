import type { Request, Response } from "express";
import type { Container } from "inversify";
import { TYPES } from "../container/types";
import type { IReportService } from "../domain/interfaces/IReportService";

export class ReportController {
    private container: Container

    constructor(container: Container) {
        this.container = container;
    }

    handle = (req: Request, res: Response) => {
        try {
            const n = Number(req.params.n);
            const email = String(req.query.email ?? "");

    
            if (!email) {
                return res.status(400).json({ error: "Missing email query param" });
            }

            const reportService = this.container.get<IReportService>(TYPES.ReportService);

      
            reportService.generateAndSend(email, n);

            return res.status(200).json({ message: "Relatório enviado com sucesso" });
        } catch (err: any) {
            if (err?.message === "InvalidReportSizeError") {
                return res.status(400).json({ error: "Invalid n (must be integer between 1 and 10)" });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
  };
}
