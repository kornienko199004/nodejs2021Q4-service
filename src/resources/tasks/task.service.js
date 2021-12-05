const { body } = require('express-validator');
const tasksRepo = require('./task.memory.repository');
const { idValidation } = require('../../utils/validation.helper');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const create = (value) => tasksRepo.create(value);
const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);
const updateTask = (boardId, taskId, task) => tasksRepo.updateTask(boardId, taskId, task);
const removeTask = (boardId, taskId) => tasksRepo.removeTask(boardId, taskId);

const validate = (method) => {
  switch (method) {
    case 'create': {
     return [
        body('title', 'title doesn\'t exists').exists(),
        body('order', 'order doesn\'t exists').exists(),
        body('description', 'description doesn\'t exists').exists(),
        idValidation('boardId'),
       ];
    }
    case 'deleteTask':
    case 'getTask': {
     return [
        idValidation()
       ];
    }
    case 'updateTask': {
      return [
         idValidation(),
         body('title', 'title doesn\'t exists').exists(),
         body('order', 'order doesn\'t exists').exists(),
         body('description', 'description doesn\'t exists').exists(),
        ];
    }
    default:
      return [];
  }
}

module.exports = { getAll, validate, create, getTask, updateTask, removeTask };
