import { config } from "dotenv";

config({
    path: process.env.NODE_ENV!.trim() === 'dev' ? '.env.test' : '.env'
});

const MAIL_TRAP_HOST = process.env.MAIL_TRAP_HOST;
const MAIL_TRAP_PORT = process.env.MAIL_TRAP_PORT;
const MAIL_TRAP_USER = process.env.MAIL_TRAP_USER;
const MAIL_TRAP_PASS = process.env.MAIL_TRAP_PASS;

export {
    MAIL_TRAP_HOST,
    MAIL_TRAP_PORT,
    MAIL_TRAP_USER,
    MAIL_TRAP_PASS
};