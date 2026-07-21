import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import z, { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const zPretty = z.prettifyError;

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: "erro",
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(422).json({
      status: "dados_invalidos",
      message: "Dados inválidos enviados na requisição",
      errors: zPretty ? zPretty(error) : error.format,
    });
    return;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({
        status: "nao_encontrado",
        message: "Registro não encontrado.",
      });
      return;
    } else if (error.code === "P2002") {
      res.status(409).json({
        status: "conflito",
        message:
          "Já existe um registro com a chave única enviada na requisição.",
      });
    } else {
      res.status(400).json({
        status: "solicitacao_invalida",
        message: "Erro na operação com o banco de dados.",
      });
    }
  }

  console.error("*====ERROR====*", error);

  res.status(500).json({
    status: "erro",
    message: "Erro interno do servidor.",
  });
};
