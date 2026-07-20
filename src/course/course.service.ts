import { CourseRepository } from "./course.repository";
import {
  createCourse,
  ResponseCourseList,
  type CreateCourseBody,
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
}
