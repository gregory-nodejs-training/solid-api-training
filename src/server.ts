import { app } from "./app";
import "express-async-errors";
import "reflect-metadata";

app.listen(3333, () => console.log("Server is running"));