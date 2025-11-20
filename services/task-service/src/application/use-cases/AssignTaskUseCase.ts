import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class AssignTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}

  async execute(taskId: string, userId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    task.assignedTo = userId;

    return await this.taskRepo.update(task);
  }
}