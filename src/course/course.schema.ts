import { z } from "zod";
import { ResponseEnrollment } from "../enrollment/enrollment.schema";

export const createCourse = z.object({
  title: z.string().min(3).max(255),
  category: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
});

export const responseCourse = z.object({
  id: z.uuid(),
  title: z.string().min(3).max(255),
  category: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  enrollments: z.array(ResponseEnrollment).optional(),
  createdAt: z.coerce.date(),
});

export type courseCursor = { id: string; category?: string };

export type CreateCourseBody = z.infer<typeof createCourse>;
export type ResponseCourseBody = z.infer<typeof responseCourse>;
export const ResponseCourseList = z.array(responseCourse);
