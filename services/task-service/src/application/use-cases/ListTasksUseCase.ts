import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class ListTasksUseCase {
  constructor(private taskRepo: ITaskRepository) {}

  async execute() {
    return await this.taskRepo.findAll();
  }
}