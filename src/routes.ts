import { Router } from "express";

import AuthMiddleware from "./middlewares/AuthMiddleware";

import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";

const router = Router();

router.get("/users", AuthMiddleware, UserController.index);
router.post("/users", UserController.create);

router.post("/auth", AuthController.authenticate);

export default router;
