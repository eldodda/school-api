import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { EnrollmentController } from "../enrollment/enrollment.controller";
import { EnrollmentRepository } from "../enrollment/enrollment.repository";
import { EnrollmentService } from "../enrollment/enrollment.service";

export const enrollRouter = Router();

const enrollRepo = new EnrollmentRepository();
const enrollService = new EnrollmentService(enrollRepo);
const enrollController = new EnrollmentController(enrollService);

enrollRouter
  .post("/enrollments", (req: Request, res: Response, next: NextFunction) => {
    enrollController.createEnrollment(req, res, next);
  })
  .get(
    "/students/:studentId/enrollments",
    (req: Request, res: Response, next: NextFunction) => {
      enrollController.listEnrollments(req, res, next);
    },
  )
  .delete(
    "/enrollments/:id",
    (req: Request, res: Response, next: NextFunction) => {
      enrollController.deleteEnrollment(req, res, next);
    },
  );
