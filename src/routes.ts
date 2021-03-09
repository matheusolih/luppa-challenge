import { Router } from "express";
import { AnalysisController } from "./controller/AnalysisController";
import { DocumentsController } from "./controller/DocumentsController";
import { UserController } from "./controller/UserController";

const router = Router();

const userController = new UserController();
const documentController = new DocumentsController();
const analysisController = new AnalysisController();

router.post("/users", userController.create);
router.post("/documents", documentController.create);
router.post("/analysis", analysisController.execute);

export { router };
