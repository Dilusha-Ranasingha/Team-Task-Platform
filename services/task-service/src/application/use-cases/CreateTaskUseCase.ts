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

    return await this.taskRepo.create(task);
  }
}