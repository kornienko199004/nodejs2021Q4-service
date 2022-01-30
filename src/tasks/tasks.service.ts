import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  /**
   * Creates new task
   * @param value payload for new task creation
   * @returns Promise<Task>
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.order = createTaskDto.order;
    if (createTaskDto.userId) {
      task.userId = createTaskDto.userId;
    }
  
    if (createTaskDto.boardId) {
      task.boardId = createTaskDto.boardId;
    }
  
    if (createTaskDto.columnId) {
      task.columnId = createTaskDto.columnId;
    }

    await this.tasksRepository.save(task);
    return task;
  }

  /**
   * Returns all tasks
   * @returns Promise<Task[]>
   */
  findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { boardId } });
  }

  /**
   * Returns task by id
   * @param id task id
   * @returns Promise<Task | undefined>
   */
  findOne(id: string): Promise<Task | undefined> {
    return this.tasksRepository.findOne(id);
  }

  /**
   * Updates task by id
   * @param id board id
   * @param board updated task value
   * @returns Promise<Task | null | undefined>
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null | undefined> {
    const task = await this.tasksRepository.findOne(id);
  
    if (task) {
      this.tasksRepository.merge(task, updateTaskDto);
      const results = await this.tasksRepository.save(task);
      return results;
    }
    return null;
  }

  /**
   * Removes task by id
   * @param id task id
   * @returns Promise<Task | null>
   */
  async remove(id: string): Promise<Task | null> {
    const task = await this.tasksRepository.findOne(id);
    const results = await this.tasksRepository.delete(id);
  
    if (results && task) {
      return task;
    }
    return null;
  }

  /**
   * Removes tasks by boardId
   * @param boardId board id for delete
   * @returns Void
   */
  async deleteTasksByBoardId(boardId: string): Promise<void> {
    const tasks = await this.tasksRepository.find({ where: { boardId } });
    const tasksIds: string[] = tasks.map((task: Task) => task.id);
  
    if (tasksIds && tasksIds.length > 0) {
      await this.tasksRepository.delete(tasksIds);
    }
  }
  
  /**
   * Unassign user by user id
   * @param userId user id for unassign
   * @returns Void
   */
  async unassignUser(userId: string): Promise<void> {
    await this.tasksRepository
      .createQueryBuilder()
      .update()
      .set({ userId: null as unknown as string })
      .where(`userId = :userId`, { userId})
      .execute();
  }
}
