import { z } from "zod";

export const createCourse = z.object({
  title: z.string().min(3).max(255),
  category: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
});

export const responseCourse = z.object({
  id: z.uuid(),
  title: z.string().min(3).max(255),
  category: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  createdAt: z.coerce.date(),
});

export type CreateCourseBody = z.infer<typeof createCourse>;
export type ResponseCourseBody = z.infer<typeof responseCourse>;
