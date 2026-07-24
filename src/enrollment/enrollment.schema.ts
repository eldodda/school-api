import z from "zod";
import { registry } from "../config/openapi";

export const CreateEnrollment = z.object({
  studentId: z
    .uuid()
    .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
  courseId: z
    .uuid()
    .openapi({ example: "daf409df-60b2-45ce-856e-c42444b386d7" }),
});

export const ResponseEnrollment = registry.register(
  "Matrículas",
  z.object({
    id: z.uuid().openapi({ example: "c13b910d-9f16-40d7-85c2-d57d78940ea2" }),
    studentId: z
      .uuid()
      .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    courseId: z
      .uuid()
      .openapi({ example: "daf409df-60b2-45ce-856e-c42444b386d7" }),
    createdAt: z.coerce.date().openapi({ example: "2026-07-22T17:18:38.011Z" }),
  }),
);

export type enrollCursor = { id: string; createdAt: string };

export type CreateEnrollBody = z.infer<typeof CreateEnrollment>;
export type ResponseEnrollBody = z.infer<typeof ResponseEnrollment>;
export const ResponseEnrollList = z.array(ResponseEnrollment);
