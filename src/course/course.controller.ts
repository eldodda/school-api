import type { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";

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
      const foundCourse = await this.courseService.findById(String(id));
      return res.status(200).json(foundCourse);
    } catch (err) {
      next(err);
    }
  }
}
