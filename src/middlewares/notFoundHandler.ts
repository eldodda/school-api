import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
}
