import { includes } from "zod";
import { prisma } from "../db/prisma";
import type {
  studentCursor,
  CreateStudentBody,
  ResponseStudentBody,
} from "./student.schema";

export class StudentRepository {
  async save(data: CreateStudentBody) {
    return await prisma.student.create({ data });
  }

  async list(cursor?: studentCursor) {
    const pageSize = 3;
    const list = await prisma.student.findMany({
      take: pageSize,
      ...(cursor && {
        cursor: {
          id: cursor.id,
        },
        skip: 1,
      }),
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });
    const lastItem = list[list.length - 1];
    const nextCursor =
      list.length === pageSize
        ? { id: lastItem.id, name: lastItem.name }
        : null;

    return { data: list, nextCursor };
  }

  async find(id: ResponseStudentBody["id"]) {
    const foundStudent = await prisma.student.findUnique({
      include: { enrollments: true },
      where: { id },
    });
    return foundStudent;
  }

  async update(id: ResponseStudentBody["id"], data: CreateStudentBody) {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data,
    });
    return updatedStudent;
  }

  async delete(id: ResponseStudentBody["id"]) {
    await prisma.student.delete({
      where: { id },
    });
  }
}
