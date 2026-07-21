import type { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";
import { AppError } from "../middlewares/AppError";

export default class CourseController {
  constructor(private readonly courseService: CourseService) {}

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const courseCreated = await this.courseService.create(data);
      return res.status(201).json(courseCreated);
    } catch (err) {
      next(err);
    }
  }

  async listCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { cursorId, cursorCategory } = req.query;
      const cursor = cursorId
        ? {
            id: String(cursorId),
            category: cursorCategory ? String(cursorCategory) : undefined,
          }
        : undefined;

      const result = await this.courseService.list(cursor);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async findCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new AppError("É necessário um ID para buscar.", 400);
      const foundCourse = await this.courseService.findById(String(id));
      return res.status(200).json(foundCourse);
    } catch (err) {
      next(err);
    }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new AppError("É necessário um ID para atualizar um curso.", 400);

      const data = req.body;
      if (!data)
        throw new AppError("Insira novos dados para atualizar o curso.", 400);

      const updatedCourse = await this.courseService.update(String(id), data);

      return res.status(200).json(updatedCourse);
    } catch (err) {
      next(err);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new AppError("É necessário um ID para excluir um curso.", 400);
      await this.courseService.delete(String(id));
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
