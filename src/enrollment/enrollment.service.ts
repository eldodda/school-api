import type { EnrollmentRepository } from "./enrollment.repository";
import {
  CreateEnrollment,
  ResponseEnrollList,
  type CreateEnrollBody,
} from "./enrollment.schema";

export class EnrollmentService {
  constructor(private readonly enrollRepo: EnrollmentRepository) {}

  async create(data: CreateEnrollBody) {
    const parsed = CreateEnrollment.parse(data);
    return await this.enrollRepo.save(parsed);
  }

  async list(studentId: string) {
    const foundEnrolls = await this.enrollRepo.list(studentId);
    const parsed = ResponseEnrollList.parse(foundEnrolls);
    return parsed;
  }

  async delete(id: string) {
    return await this.enrollRepo.delete(id);
  }
}
