import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { StudentRepository } from "../student/student.repository";
import { StudentService } from "../student/student.service";
import StudentController from "../student/student.controller";

export const studentRoutes = Router();
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentRoutes
  .post("/students", (req: Request, res: Response, next: NextFunction) => {
    studentController.createStudent(req, res, next);
  })
  .get("/students", (req: Request, res: Response, next: NextFunction) => {
    studentController.listStudents(req, res, next);
  })
  .get("/students/:id", (req: Request, res: Response, next: NextFunction) => {
    studentController.findStudent(req, res, next);
  })
  .put("/students/:id", (req: Request, res: Response, next: NextFunction) => {
    studentController.updateStudent(req, res, next);
  })
  .delete(
    "/students/:id",
    (req: Request, res: Response, next: NextFunction) => {
      studentController.deleteStudent(req, res, next);
    },
  );
