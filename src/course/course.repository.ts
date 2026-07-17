import { prisma } from "../db/prisma";
import type { CreateCourseBody, ResponseCourseBody } from "./course.schema";

export class CourseRepository {
  async save(data: CreateCourseBody) {
    return await prisma.course.create({ data });
  }
}
