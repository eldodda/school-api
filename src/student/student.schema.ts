import z from "zod";
import { ResponseEnrollment } from "../enrollment/enrollment.schema";
import { registry } from "../config/openapi";

export const CreateStudent = z.object({
  name: z.string().min(3).max(255).openapi({ example: "Little Bear" }),
  email: z.string().min(5).max(255).openapi({ example: "little@bear.com" }),
});

export const ResponseStudent = registry.register(
  "Estudantes",
  z.object({
    id: z.uuid().openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    name: z.string().min(3).max(255).openapi({ example: "Little Bear" }),
    email: z.email().openapi({ example: "little@bear.com" }),
    enrollments: z
      .array(ResponseEnrollment)
      .optional()
      .openapi({ example: "c13b910d-9f16-40d7-85c2-d57d78940ea2" }),
    createdAt: z.coerce.date().openapi({ example: "2026-07-22T17:18:38.011Z" }),
  }),
);

export type studentCursor = { id: string; name?: string };

export type CreateStudentBody = z.infer<typeof CreateStudent>;
export type ResponseStudentBody = z.infer<typeof ResponseStudent>;
export const ResponseStudentList = z.array(ResponseStudent);
