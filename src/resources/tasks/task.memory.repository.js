const Task = require('./task.model');
const boardsService = require('../boards/board.service');

const data = [];

const getAll = async (boardId) => {
  const board = await boardsService.getBoard(boardId);
  return board.getTasks();
}

const create = async (value) => {
  const task = new Task(value);
  data.push(task);
  const board = await boardsService.getBoard(task.boardId);
  board.addTask(task);
  return task;
};

const getTask = async (boardId, taskId) => {
  const board = await boardsService.getBoard(boardId);
  return board.getTask(taskId);
}
// const getTask = async (id) => data.find((item) => item.id === id);

const removeTaskFromWithBoard = async (id) => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    const task = data[index];
    data.splice(index, 1);
    return task;
  }
  return null;
}

const removeTask = async (boardId, id) => {
  const board = await boardsService.getBoard(boardId);
  return board.removeTask(id);
}

const updateTask = async (boardId, taskId, task) => {
  const board = await boardsService.getBoard(boardId);
  return board.updateTask(taskId, task);
};

module.exports = { getAll, create, getTask, updateTask, removeTaskFromWithBoard, removeTask };
