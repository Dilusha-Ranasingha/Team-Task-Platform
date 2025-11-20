import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";
import { TaskModel } from "../db/models/TaskModel";

export class TaskRepositoryMongo implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    const created = await TaskModel.create({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status,
    });

    return new Task(
      created._id.toString(),
      created.title,
      created.description,
      created.assignedTo,
      created.status,
    );
  }

  async findById(id: string): Promise<Task | null> {
    const found = await TaskModel.findById(id);
    if (!found) return null;

    return new Task(
      found._id.toString(),
      found.title,
      found.description,
      found.assignedTo,
      found.status
    );
  }

  async findAll(): Promise<Task[]> {
    const tasks = await TaskModel.find({});
    return tasks.map(
      (t) =>
        new Task(
          t._id.toString(),
          t.title,
          t.description,
          t.assignedTo,
          t.status
        )
    );
  }

  async update(task: Task): Promise<Task> {
    const updated = await TaskModel.findByIdAndUpdate(
      task.id,
      {
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        status: task.status,
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("Task not found");
    }

    return new Task(
      updated._id.toString(),
      updated.title,
      updated.description,
      updated.assignedTo,
      updated.status
    );
  }
}