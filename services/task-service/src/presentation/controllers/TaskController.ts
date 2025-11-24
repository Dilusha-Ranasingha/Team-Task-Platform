import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { AssignTaskUseCase } from "../../application/use-cases/AssignTaskUseCase";
import { ListTasksUseCase } from "../../application/use-cases/ListTasksUseCase";

export class TaskController {
  constructor(
    private createTask: CreateTaskUseCase,
    private assignTask: AssignTaskUseCase,
    private listTasks: ListTasksUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const userId = (req as any).userId;

      const result = await this.createTask.execute(title, description, userId);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  assign = async (req: Request, res: Response) => {
    try {
      const { taskId, userId } = req.body;

      const result = await this.assignTask.execute(taskId, userId);

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  listAll = async (req: Request, res: Response) => {
    try {
      const tasks = await this.listTasks.execute();

      res.json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}