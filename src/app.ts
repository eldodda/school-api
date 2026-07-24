import cors from "cors";
import "express-async-errors";
import "dotenv/config";
import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index";
import { generateSwaggerDocument } from "./config/swagger";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";

export const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(generateSwaggerDocument()));
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
  });
}
