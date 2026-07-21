import Router from "express";
import courseRoutes from "./course.routes";
import { studentRoutes } from "./student.routes";

const router = Router();

router.use(courseRoutes).use(studentRoutes);
export default router;
