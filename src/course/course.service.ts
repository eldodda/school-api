import { CourseRepository } from "./course.repository";
import type { CreateCourseBody } from "./course.schema";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(data: CreateCourseBody) {
    const courseCreated = await this.courseRepository.save(data);
    return courseCreated;
  }
}
