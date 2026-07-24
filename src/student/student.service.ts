import { AppError } from "../middlewares/AppError";
import { StudentRepository } from "./student.repository";
import {
  CreateStudent,
  ResponseStudent,
  ResponseStudentList,
  type CreateStudentBody,
  type ResponseStudentBody,
} from "./student.schema";

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(data: CreateStudentBody) {
    const parsed = CreateStudent.parse(data);
    return await this.studentRepository.save(parsed);
  }

  async list(cursor?: { id: string; category?: string }) {
    const { data, nextCursor } = await this.studentRepository.list(cursor);
    const validatedData = ResponseStudentList.parse(data);

    return { data: validatedData, nextCursor };
  }

  async findById(id: string) {
    const found = await this.studentRepository.find(id);
    if (!found) throw new AppError("Estudante não encontrado.", 404);

    return ResponseStudent.parse(found);
  }

  async update(id: string, data: CreateStudentBody) {
    const studentToUpdate = await this.studentRepository.update(id, data);
    if (!studentToUpdate) throw new AppError("Estudante não encontrado.", 404);

    return ResponseStudent.parse(studentToUpdate);
  }

  async delete(id: string) {
    const studentToDelete = await this.studentRepository.find(id);
    if (!studentToDelete) throw new AppError("Estudante não encontrado.", 404);

    await this.studentRepository.delete(id);
  }
}
