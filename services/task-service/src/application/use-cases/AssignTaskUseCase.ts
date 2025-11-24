import { eventBus } from "../../eventBus";
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

    eventBus.emit("TASK_ASSIGNED", {          // EMIT THE EVENT HERE NOTIFIYING THAT A TASK HAS BEEN ASSIGNED
      taskId: updatedTask.id,
      userId: updatedTask.assignedTo,
    });

    return updatedTask;
  }
}