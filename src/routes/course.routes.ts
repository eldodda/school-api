import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import CourseController from "../course/course.controller.ts";
import { CourseService } from "../course/course.service.ts";
import { CourseRepository } from "../course/course.repository.ts";

const courseRoutes = express.Router();
const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

courseRoutes
  .post("/courses", (req: Request, res: Response, next: NextFunction) => {
    courseController.createCourse(req, res, next);
  })
  .get("/courses", (req: Request, res: Response, next: NextFunction) => {
    courseController.listCourses(req, res, next);
  })
  .get("/courses/:id", (req: Request, res: Response, next: NextFunction) => {
    courseController.findCourse(req, res, next);
  })
  .put("/courses/:id", (req: Request, res: Response, next: NextFunction) => {
    courseController.updateCourse(req, res, next);
  })
  .delete("/courses/:id", (req: Request, res: Response, next: NextFunction) => {
    courseController.deleteCourse(req, res, next);
  });

export default courseRoutes;
