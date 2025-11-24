import axios from "axios";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class AssignTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}

  async execute(taskId: string, userId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    task.assignedTo = userId;

    const updatedTask = await this.taskRepo.update(task);

    await axios.post("http://localhost:3003/notifications/internal", {
      userId: updatedTask.assignedTo,
      message: `You were assigned a task: ${updatedTask.title}`
    });

    return updatedTask;
  }
}