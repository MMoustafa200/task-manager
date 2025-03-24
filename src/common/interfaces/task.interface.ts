import { TaskStatus } from "../enums";

export interface ITaskCreationAtr {
  name: string;
  description?: string;
}

export interface ITaskAtr extends ITaskCreationAtr {
  _id: string;

  status: TaskStatus;

  createdAt: Date;
  updatedAt: Date;
}
