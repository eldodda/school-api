import { prisma } from "../db/prisma";
import type { CreateEnrollBody, ResponseEnrollBody } from "./enrollment.schema";

export class EnrollmentRepository {
  async save(data: CreateEnrollBody) {
    return await prisma.enrollment.create({ data });
  }

  async list(studentId: ResponseEnrollBody["studentId"]) {
    const data = await prisma.enrollment.findMany({
      where: { studentId },
    });
    return data;
  }

  async delete(id: ResponseEnrollBody["id"]) {
    return await prisma.enrollment.delete({ where: { id } });
  }
}
