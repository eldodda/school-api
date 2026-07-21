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
    const parsed = createCourse.parse(data);
    return await this.courseRepository.save(parsed);
  }

  async list(cursor?: { id: string; category?: string }) {
    const { data, nextCursor } = await this.courseRepository.list(cursor);
    const validatedData = ResponseCourseList.safeParse(data);

    return { data: validatedData, nextCursor };
  }

  async findById(id: string) {
    const found = await this.courseRepository.find(id);
    if (!found) throw new AppError("Curso não encontrado.", 404);

    return responseCourse.parse(found);
  }

  async update(id: string, data: CreateCourseBody) {
    const courseToUpdate = await this.courseRepository.update(id, data);
    if (!courseToUpdate) throw new AppError("Curso não encontrado.", 404);

    return responseCourse.parse(courseToUpdate);
  }

  async delete(id: string) {
    const courseToDelete = await this.courseRepository.find(id);
    if (!courseToDelete) throw new AppError("Curso não encontrado.", 404);

    await this.courseRepository.delete(id);
  }
}
