import { TaskParams } from '../../models/interfaces';
import { Task } from './task.model';

let tasks: Task[] = [];

/**
 * Returns all tasks
 * @returns Promise<Task[]>
 */
const getAll = async (boardId: string): Promise<Task[]> => tasks.filter((task) => task.boardId === boardId)

/**
 * Creates new task
 * @param value payload for new task creation
 * @returns Promise<Task>
 */
const create = async (value: TaskParams): Promise<Task> => {
  const task = new Task(value);
  tasks.push(task);
  return task;
};

/**
 * Returns task by id
 * @param id task id
 * @returns Promise<Task | undefined>
 */
const getTask = async (taskId: string): Promise<Task | undefined> => tasks.find((task) => task.id === taskId);

/**
 * Removes task by id
 * @param id task id
 * @returns Promise<Task | null>
 */
const removeTask = async (taskId: string): Promise<Task | null> => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index > -1) {
    const task = tasks.splice(index, 1)[0];
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
const updateTask = async (taskId: string, task: Task): Promise<Task | null | undefined> => {
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index > -1) {
    tasks[index] = task;
    return getTask(taskId);
  }
  return null;
};

/**
 * Removes tasks by boardId
 * @param boardId board id for delete
 * @returns Void
 */
const deleteTasksByBoardId = (boardId: string): void => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

/**
 * Unassign user by user id
 * @param userId user id for unassign
 * @returns Void
 */
const unassignUser = (userId: string): void => {
  tasks = tasks.map((task) => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  })
}

export { getAll, create, getTask, updateTask, removeTask, deleteTasksByBoardId, unassignUser };
