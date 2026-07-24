import type { ErrorRequestHandler, Request, Response } from "express";
import { AppError } from "./AppError";
import z, { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const zPretty = z.prettifyError;

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
) => {
  console.error("<======ERRO======>", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "erro",
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      status: "dados_invalidos",
      message: "Dados inválidos enviados na requisição",
      errors: zPretty ? zPretty(error) : error.format,
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({
        status: "nao_encontrado",
        message: "Registro não encontrado.",
      });
    } else if (error.code === "P2002") {
      return res.status(409).json({
        status: "conflito",
        message:
          "Já existe um registro com a chave única enviada na requisição.",
      });
    } else if (error.code === "P2003") {
      return res.status(404).json({
        status: "nao_encontrado",
        message: "ID não encontrado no banco de dados.",
      });
    } else {
      return res.status(400).json({
        status: "solicitacao_invalida",
        message: "Erro na operação com o banco de dados.",
      });
    }
  }

  return res.status(500).json({
    status: "erro",
    message: "Erro interno do servidor.",
  });
};
