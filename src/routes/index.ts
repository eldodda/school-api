import Router from "express";
import courseRoutes from "./course.routes";
import { studentRoutes } from "./student.routes";
import { enrollRouter } from "./enrollment.routes";

const router = Router();

router.use(courseRoutes).use(studentRoutes).use(enrollRouter);
export default router;
