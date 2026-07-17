import "reflect-metadata";
import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import router from "./routes/index.ts";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
