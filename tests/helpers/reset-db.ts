import { prisma } from "../../src/db/prisma";
export async function resetDb() {
  await prisma.enrollment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();
}
