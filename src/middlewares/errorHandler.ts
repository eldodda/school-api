import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import z, { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { notFoundHandler } from "./notFoundHandler";

const zPretty = z.prettifyError;

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      status: "Bad_request",
      message: "Dados inválidos inseridos na requisição",
      errors: zPretty ? zPretty(error) : error.format,
    });
    return;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({
        status: "Not_found",
        message: "Registro obrigatório não encontrado.",
      });
      return;
    }
  }

  console.error("*====ERROR====*", error);

  res.status(500).json({
    status: error,
    message: "Internal server error.",
  });
};
