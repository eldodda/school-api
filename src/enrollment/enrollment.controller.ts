import type { NextFunction, Request, Response } from "express";
import type { EnrollmentService } from "./enrollment.service";
import { AppError } from "../middlewares/AppError";

export class EnrollmentController {
  constructor(private readonly enrollService: EnrollmentService) {}

  async createEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, studentId } = req.query;
      if (!courseId || !studentId)
        throw new AppError("Insira o ID do curso e ID do estudante.", 400);
      const data = { courseId: String(courseId), studentId: String(studentId) };
      const enrollCreated = await this.enrollService.create(data);
      return res.status(201).json(enrollCreated);
    } catch (err) {
      next(err);
    }
  }

  async listEnrollments(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = req.params;
      if (!studentId)
        throw new AppError("Insira o ID do estudante para buscar.", 400);
      const enrolls = await this.enrollService.list(String(studentId));
      return res.status(200).json(enrolls);
    } catch (err) {
      next(err);
    }
  }

  async deleteEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new AppError("Insira o ID da matrícula para excluir.", 400);
      await this.enrollService.delete(String(id));
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
