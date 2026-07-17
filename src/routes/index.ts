import Router from "express";
import courseRoutes from "./course.routes";
import { errorHandler } from "../middlewares/errorHandler";
import { notFoundHandler } from "../middlewares/notFoundHandler";

const router = Router();

router.use(courseRoutes).use(notFoundHandler).use(errorHandler);

export default router;
