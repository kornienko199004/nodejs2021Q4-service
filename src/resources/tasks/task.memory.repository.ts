import { TaskParams } from '../../models/interfaces';
import { Task } from './task.model';

let tasks: Task[] = [];

const getAll = async (boardId: string): Promise<Task[]> => tasks.filter((task) => task.boardId === boardId)

const create = async (value: TaskParams): Promise<Task> => {
  const task = new Task(value);
  tasks.push(task);
  return task;
};

const getTask = async (taskId: string): Promise<Task | undefined> => tasks.find((task) => task.id === taskId);

const removeTask = async (taskId: string): Promise<Task | null> => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index > -1) {
    const task = tasks.splice(index, 1)[0];
    return task;
  }
  return null;
}

const updateTask = async (taskId: string, task: Task): Promise<Task | null | undefined> => {
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index > -1) {
    tasks[index] = task;
    return getTask(taskId);
  }
  return null;
};

const deleteTasksByBoardId = (boardId: string): void => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

const unassignUser = (userId: string): void => {
  tasks = tasks.map((task) => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  })
}

export { getAll, create, getTask, updateTask, removeTask, deleteTasksByBoardId, unassignUser };
