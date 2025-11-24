import { eventBus } from "../../eventBus";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";

export class CreateTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}

  async execute(title: string, description: string) {
    const task = new Task(
      null,
      title,
      description,
      null, // not assigned yet
      "TODO"
    );

    const savedTask = await this.taskRepo.create(task);

    eventBus.emit("TASK_CREATED", {           // EMIT THE EVENT HERE NOTIFIYING THAT A NEW TASK HAS BEEN CREATED
      taskId: savedTask.id,
      title: savedTask.title
    });

    return savedTask;
  }
}