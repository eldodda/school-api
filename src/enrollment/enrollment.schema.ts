import z from "zod";

export const CreateEnrollment = z.object({
  studentId: z.uuid(),
  courseId: z.uuid(),
});

export const ResponseEnrollment = z.object({
  id: z.uuid(),
  studentId: z.uuid(),
  courseId: z.uuid(),
  createdAt: z.coerce.date(),
});

export type enrollCursor = { id: string; createdAt: string };

export type CreateEnrollBody = z.infer<typeof CreateEnrollment>;
export type ResponseEnrollBody = z.infer<typeof ResponseEnrollment>;
export const ResponseEnrollList = z.array(ResponseEnrollment);
