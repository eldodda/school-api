import "reflect-metadata";
import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import router from "./routes/index.ts";
import { notFoundHandler } from "./middlewares/notFoundHandler.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
