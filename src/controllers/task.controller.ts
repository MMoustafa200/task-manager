import { HTTPStatusCode } from "../common/enums";
import { ITaskAtr, ITaskCreationAtr } from "../common/interfaces";
import { TaskService } from "../services/task.service";
import { Request, Response, Router } from "express";

export class TaskController {
  constructor(private readonly service: TaskService = new TaskService()) {}

  private async getList(req: Request, res: Response) {
    const tasks = await this.service.list();

    res.status(HTTPStatusCode.OK).json({
      data: tasks,
    });
  }

  private async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const task = await this.service.getById(id);

    //TODO: if task is null, handle it

    res.status(HTTPStatusCode.OK).json({
      data: task,
    });
  }

  private async postCreate(
    req: Request<{}, {}, ITaskCreationAtr>,
    res: Response
  ) {
    const newTask = await this.service.createOne(req.body);

    res.status(HTTPStatusCode.Created).json({
      data: newTask,
    });
  }

  private async patchUpdate(
    req: Request<{ id: string }, {}, Partial<ITaskAtr>>,
    res: Response
  ) {
    const { id } = req.params;
    const updatedTask = await this.service.updateById(id, req.body);

    //TODO: if task is null, handle it

    res.status(HTTPStatusCode.OK).json({
      data: updatedTask,
    });
  }

  private async deleteById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const deletedTask = await this.service.deleteById(id);

    //TODO: if task is null, handle it

    res.status(HTTPStatusCode.OK).json({});
  }

  loadRoutes(): Router {
    const router = Router();

    router.get("/", this.getList.bind(this));

    router.get("/:id", this.getById.bind(this));

    router.post("/", this.postCreate.bind(this));

    router.patch("/:id", this.patchUpdate.bind(this));

    router.delete("/:id", this.deleteById.bind(this));

    return router;
  }
}
