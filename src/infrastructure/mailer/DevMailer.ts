import nodemailer, { Transporter } from "nodemailer";
import type { IMailer } from "../../domain/interfaces/IMailer";

import { injectable } from "inversify";

@injectable()
export class DevMailer implements IMailer {
    private transporterPromise: Promise<Transporter>;

    constructor() {
        this.transporterPromise = this.createTransporter();
    }

    private async createTransporter(): Promise<Transporter> {
        const testAccount = await nodemailer.createTestAccount();

        return nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    }

    send(to: string, subject: string, body: string): void {
        void (async () => {
            const transporter = await this.transporterPromise;

            const info = await transporter.sendMail({
                from: '"Relatórios (DEV)" <no-reply@dev.local>',
                to,
                subject,
                text: body,
            });

            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log("Ethereal preview:", previewUrl);
        })();
  }
}
