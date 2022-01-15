import { getRepository } from "typeorm";
import { TaskParams } from '../../models/interfaces';
import { Task } from './task.model';
import { Task as TaskEntity } from '../../entity/Task';

/**
 * Returns all tasks
 * @returns Promise<Task[]>
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  const taskRepository = getRepository(TaskEntity);
  const rsl = await taskRepository.find({ where: { boardId } });
  return rsl;
};
/**
 * Creates new task
 * @param value payload for new task creation
 * @returns Promise<Task>
 */
const create = async (value: TaskParams): Promise<Task> => {
  const tasksRepository = getRepository(TaskEntity);
  const task: TaskEntity = new TaskEntity();
  task.title = value.title;
  task.description = value.description;
  task.order = value.order;
  if (value.userId) {
    task.userId = value.userId;
  }

  if (value.boardId) {
    task.boardId = value.boardId;
  }

  if (value.columnId) {
    task.columnId = value.columnId;
  }

  await tasksRepository.save(task);
  return task;
};

/**
 * Returns task by id
 * @param id task id
 * @returns Promise<Task | undefined>
 */
const getTask = async (taskId: string): Promise<Task | undefined> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);
  return task;
};

/**
 * Removes task by id
 * @param id task id
 * @returns Promise<Task | null>
 */
const removeTask = async (taskId: string): Promise<Task | null> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);
  const results = await tasksRepository.delete(taskId);

  if (results && task) {
    return task;
  }
  return null;
}

/**
 * Updates task by id
 * @param id board id
 * @param board updated task value
 * @returns Promise<Task | null | undefined>
 */
const updateTask = async (taskId: string, value: Task): Promise<Task | null | undefined> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);

  if (task) {
    tasksRepository.merge(task, value);
    const results = await tasksRepository.save(task);
    return results;
  }
  return null;
};

/**
 * Removes tasks by boardId
 * @param boardId board id for delete
 * @returns Void
 */
const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const tasksRepository = getRepository(TaskEntity);
  const tasks = await tasksRepository.find({ where: { boardId } });
  const tasksIds: string[] = tasks.map((task: TaskEntity) => task.id);

  if (tasksIds && tasksIds.length > 0) {
    await tasksRepository.delete(tasksIds);
  }
};

/**
 * Unassign user by user id
 * @param userId user id for unassign
 * @returns Void
 */
const unassignUser = async (userId: string): Promise<void> => {
  await getRepository(TaskEntity).createQueryBuilder()
    .update()
    .set({ userId: null as unknown as string })
    .where(`userId = :userId`, { userId})
    .execute();
}

export { getAll, create, getTask, updateTask, removeTask, deleteTasksByBoardId, unassignUser };
