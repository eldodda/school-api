import express, { type Request, type Response } from "express";
import CourseController from "../course/course.controller.ts";
import { CourseService } from "../course/course.service.ts";
import { CourseRepository } from "../course/course.repository.ts";

const courseRoutes = express.Router();
const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

courseRoutes.post("/courses", (req: Request, res: Response) => {
  void courseController.create(req, res);
});

export default courseRoutes;
