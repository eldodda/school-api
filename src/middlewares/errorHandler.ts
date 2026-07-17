import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import z, { ZodError } from "zod";

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
      status: "validation_error",
      message: "Dados inválidos inseridos na requisição",
      errors: zPretty(error),
    });
  }

  console.error("*====ERROR====*", error);

  res.status(500).json({
    status: error,
    message: "Internal server error.",
  });
};
