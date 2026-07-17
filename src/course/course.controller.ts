import type { Request, Response } from "express";
import { createCourse } from "./course.schema";
import { CourseService } from "./course.service";

export default class CourseController {
  constructor(private readonly courseService: CourseService) {}
  async create(req: Request, res: Response) {
    const parseResult = createCourse.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Invalid course data.",
        errors: parseResult.error.format,
      });
    }
    const validatedData = await parseResult.data;
    const courseCreated = await this.courseService.create(validatedData);
    return res.status(201).json(courseCreated);
  }
}
