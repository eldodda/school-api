import z from "zod";
import { ResponseEnrollment } from "../enrollment/enrollment.schema";

export const CreateStudent = z.object({
  name: z.string().min(3).max(255),
  email: z.string().min(5).max(255),
});

export const ResponseStudent = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(255),
  email: z.email(),
  enrollments: z.array(ResponseEnrollment).optional(),
  createdAt: z.coerce.date(),
});

export type studentCursor = { id: string; name?: string };

export type CreateStudentBody = z.infer<typeof CreateStudent>;
export type ResponseStudentBody = z.infer<typeof ResponseStudent>;
export const ResponseStudentList = z.array(ResponseStudent);
