import axios from "axios";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";

export class CreateTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}

  async execute(title: string, description: string, userId: string) {
    const task = new Task(
      null,
      title,
      description,
      null, // not assigned yet
      "TODO"
    );

    const savedTask = await this.taskRepo.create(task);

    await axios.post("http://localhost:3003/notifications/internal", {
      userId: userId,
      message: `New task created: ${savedTask.title}`
    });

    return savedTask;
  }
}