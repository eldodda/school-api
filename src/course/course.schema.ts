import { z } from "zod";
import { ResponseEnrollment } from "../enrollment/enrollment.schema";
import { registry } from "../config/openapi";

export const createCourse = z.object({
  title: z.string().min(3).max(255).openapi({ example: "Boxing" }),
  category: z
    .string()
    .min(3)
    .max(255)
    .optional()
    .openapi({ example: "Sports" }),
  description: z
    .string()
    .min(3)
    .max(255)
    .optional()
    .openapi({ example: "Now we punch." }),
});

export const responseCourse = registry.register(
  "Cursos",
  z.object({
    id: z.uuid().openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    title: z.string().min(3).max(255).openapi({ example: "Boxing" }),
    category: z.string().min(3).max(255).openapi({ example: "Sports" }),
    description: z
      .string()
      .min(3)
      .max(255)
      .openapi({ example: "Now we punch." }),
    enrollments: z
      .array(ResponseEnrollment)
      .optional()
      .openapi({ example: [] }),
    createdAt: z.coerce.date().openapi({ example: "2026-07-22T17:41:22.285Z" }),
  }),
);

export type courseCursor = { id: string; category?: string };

export type CreateCourseBody = z.infer<typeof createCourse>;
export type ResponseCourseBody = z.infer<typeof responseCourse>;
export const ResponseCourseList = z.array(responseCourse);
