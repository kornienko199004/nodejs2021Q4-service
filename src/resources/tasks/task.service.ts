import { body } from 'express-validator';
import * as tasksRepo from './task.memory.repository';
import { idValidation } from '../../utils/validation.helper';

export const getAll = (boardId) => tasksRepo.getAll(boardId);
export const create = (value) => tasksRepo.create(value);
export const getTask = (id) => tasksRepo.getTask(id);
export const updateTask = (taskId, task) => tasksRepo.updateTask(taskId, task);
export const removeTask = (taskId) => tasksRepo.removeTask(taskId);
export const deleteTasksByBoardId = (boardId) => tasksRepo.deleteTasksByBoardId(boardId);
export const unassignUser = (userId) => tasksRepo.unassignUser(userId);

export const validate = (method) => {
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
