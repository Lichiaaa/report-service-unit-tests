import { faker } from "@faker-js/faker";
import { IMailer } from "../interfaces/IMailer";
import { ILogger } from "../interfaces/ILogger";
import { IReportService } from "../interfaces/IReportService";

import { injectable, inject } from "inversify";
import { TYPES } from "../../container/types";

@injectable()
export class ReportService implements IReportService{
    private logger: ILogger;
    private mailer: IMailer;
    
    constructor(@inject(TYPES.Logger) logger: ILogger, @inject(TYPES.Mailer) mailer: IMailer){
        this.logger = logger;
        this.mailer = mailer;
    }

    generateAndSend(email: string, n: number): void {
        this.logger.info("Iniciando geração do relatório");

        //Verificar se n não é maior que 10, e se é inteiro
        if(!Number.isInteger(n) || n < 1 || n > 10){
            throw new Error("[ERROR]InvalidReportSizeError");
        }

        const records: Array<{ nome: string; cidade: string }> = [];
        for (let i = 0; i < n; i++) {
        records.push({
            nome: faker.person.fullName(),
            cidade: faker.location.city(),
        });
        }

        const subject: string = `Relatório (${n} registros)`;
        const bodyLines: string[] = records.map((r, i) => `${i + 1}. ${r.nome} - ${r.cidade}`);

        const body = [
            "Relatório de Dados Fictícios",
            "===========================",
            ...bodyLines,
            "",
            "Gerado automaticamente pelo sistema."
        ].join("\n");

        this.mailer.send(email, subject, body);
        this.logger.info("Relatório enviado com sucesso");
    }
}