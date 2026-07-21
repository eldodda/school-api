import { prisma } from "../db/prisma";
import type {
  courseCursor,
  CreateCourseBody,
  ResponseCourseBody,
} from "./course.schema";

export class CourseRepository {
  async save(data: CreateCourseBody) {
    return await prisma.course.create({ data });
  }

  async list(cursor?: courseCursor) {
    const pageSize = 3;
    const list = await prisma.course.findMany({
      take: pageSize,
      ...(cursor && {
        cursor: {
          id: cursor.id,
        },
        skip: 1,
      }),
      orderBy: [{ category: "asc" }, { id: "asc" }],
    });
    const lastItem = list[list.length - 1];
    const nextCursor =
      list.length === pageSize
        ? { id: lastItem.id, category: lastItem.category }
        : null;

    return { data: list, nextCursor };
  }

  async find(id: ResponseCourseBody["id"]) {
    const foundCourse = await prisma.course.findUnique({
      where: { id },
    });
    return foundCourse;
  }

  async update(id: ResponseCourseBody["id"], data: CreateCourseBody) {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data,
    });
    return updatedCourse;
  }

  async delete(id: ResponseCourseBody["id"]) {
    await prisma.course.delete({
      where: { id },
    });
  }
}
