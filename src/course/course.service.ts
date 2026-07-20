import type { ZodUUID } from "zod";
import { AppError } from "../middlewares/AppError";
import { CourseRepository } from "./course.repository";
import {
  createCourse,
  responseCourse,
  ResponseCourseList,
  type CreateCourseBody,
  type ResponseCourseBody,
} from "./course.schema";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(data: CreateCourseBody) {
    const parsed = createCourse.safeParse(data);
    if (!parsed.success) throw parsed.error;
    const courseCreated = await this.courseRepository.save(parsed.data);
    return courseCreated;
  }

  async list(cursor?: { id: string; category?: string }) {
    const { data, nextCursor } = await this.courseRepository.list(cursor);
    const validatedData = ResponseCourseList.safeParse(data);

    return { data: validatedData, nextCursor };
  }

  async findById(id: string) {
    if (!id) throw new AppError("É necessário um ID para buscar.", 400);
    const found = await this.courseRepository.find(id);
    const validated = responseCourse.safeParse(found);
    if (!validated.success) throw validated.error;
    return validated;
  }
}
