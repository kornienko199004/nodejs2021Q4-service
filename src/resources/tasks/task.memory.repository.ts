import { Task } from './task.model';

let tasks: Task[] = [];

const getAll = async (boardId) => tasks.filter((task) => task.boardId === boardId)


const create = async (value) => {
  const task = new Task(value);
  tasks.push(task);
  return task;
};

const getTask = async (taskId) => tasks.find((task) => task.id === taskId);

const removeTask = async (taskId) => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index > -1) {
    return tasks.splice(index, 1);
  }
  return null;
}

const updateTask = async (taskId, task) => {
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index > -1) {
    tasks[index] = task;
    return getTask(taskId);
  }
  return null;
};

const deleteTasksByBoardId = (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

const unassignUser = (userId) => {
  tasks = tasks.map((task) => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  })
}

export { getAll, create, getTask, updateTask, removeTask, deleteTasksByBoardId, unassignUser };
