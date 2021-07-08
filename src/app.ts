import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";

import { errorHandler } from "./shared/utils/ErrorHandler";
import { BaseError } from "./exceptions/BaseError";

const app = express();

app.use(express.json());
app.use(router);

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
    await errorHandler.handleError(err);
    if (!errorHandler.isTrustedError(err)) {
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
    return response.status((err as BaseError).httpCode).json({
        error: err.message
    });
});

export { app };