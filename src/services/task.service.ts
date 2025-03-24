import { ITaskAtr, ITaskCreationAtr } from "../common/interfaces";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(private readonly repo: TaskRepository = new TaskRepository()) {}

  async list(): Promise<ITaskAtr[]> {
    return this.repo.findAll({});
  }

  async getById(id: string): Promise<ITaskAtr | null> {
    return this.repo.findOne({ _id: id });
  }

  async createOne(data: ITaskCreationAtr): Promise<ITaskAtr> {
    return this.repo.createOne(data);
  }

  async updateById(
    id: string,
    data: Partial<ITaskAtr>
  ): Promise<ITaskAtr | null> {
    return this.repo.updateOne({ _id: id }, data);
  }

  async deleteById(id: string): Promise<ITaskAtr | null> {
    return this.repo.deleteOne({ _id: id });
  }
}
