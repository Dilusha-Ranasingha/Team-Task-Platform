import { Router } from "express";

import { TaskRepositoryMongo } from "../../infrastructure/repositories/TaskRepositoryMongo";

import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { AssignTaskUseCase } from "../../application/use-cases/AssignTaskUseCase";
import { ListTasksUseCase } from "../../application/use-cases/ListTasksUseCase";

import { TaskController } from "../controllers/TaskController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Dependency Injection setup
const taskRepo = new TaskRepositoryMongo();

const createTaskUseCase = new CreateTaskUseCase(taskRepo);
const assignTaskUseCase = new AssignTaskUseCase(taskRepo);
const listTasksUseCase = new ListTasksUseCase(taskRepo);

const taskController = new TaskController(
  createTaskUseCase,
  assignTaskUseCase,
  listTasksUseCase
);

// Routes
router.post("/", authMiddleware,  taskController.create);
router.patch("/assign", authMiddleware,  taskController.assign);
router.get("/", authMiddleware,  taskController.listAll);

export default router;