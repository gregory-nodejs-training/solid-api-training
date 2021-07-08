import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import {
    MAIL_TRAP_HOST,
    MAIL_TRAP_PORT,
    MAIL_TRAP_USER,
    MAIL_TRAP_PASS
} from "../../config";

/**
 * https://mailtrap.io/ -> SMTP para testar envio de e-mail.
 */
class MailTrapMailProvider implements IMailProvider {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAIL_TRAP_HOST,
            port: Number(MAIL_TRAP_PORT),
            auth: {
                user: MAIL_TRAP_USER,
                pass: MAIL_TRAP_PASS
            }
        });
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }
}

export { MailTrapMailProvider };