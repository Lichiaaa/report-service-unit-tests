import nodemailer, { Transporter } from "nodemailer";
import type { IMailer } from "../../domain/interfaces/IMailer";

import { injectable } from "inversify";

@injectable()
export class ProdMailer implements IMailer {
    private transporter: Transporter;

    constructor() {
        const host = process.env.SMTP_HOST!;
        const port = Number(process.env.SMTP_PORT!);
        const user = process.env.SMTP_USER!;
        const pass = process.env.SMTP_PASS!;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
    }

    send(to: string, subject: string, body: string): void {
        void this.transporter.sendMail({
            from: `"Relatórios" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text: body,
        });
    }
}
