import type { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service";
import { AppError } from "../middlewares/AppError";

export default class StudentController {
  constructor(private readonly studentService: StudentService) {}

  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const studentCreated = await this.studentService.create(data);
      return res.status(201).json(studentCreated);
    } catch (err) {
      next(err);
    }
  }

  async listStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const { cursorId, cursorCategory } = req.query;
      const cursor = cursorId
        ? {
            id: String(cursorId),
            category: cursorCategory ? String(cursorCategory) : undefined,
          }
        : undefined;

      const result = await this.studentService.list(cursor);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async findStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new AppError("É necessário um ID para buscar.", 400);
      const foundStudent = await this.studentService.findById(String(id));
      return res.status(200).json(foundStudent);
    } catch (err) {
      next(err);
    }
  }

  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new AppError(
          "É necessário um ID para atualizar um registro.",
          400,
        );

      const data = req.body;
      if (!data)
        throw new AppError(
          "Insira novos dados para atualizar o registro.",
          400,
        );

      const updatedStudent = await this.studentService.update(String(id), data);

      return res.status(200).json(updatedStudent);
    } catch (err) {
      next(err);
    }
  }

  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new AppError("É necessário um ID para excluir um registro.", 400);
      await this.studentService.delete(String(id));
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
