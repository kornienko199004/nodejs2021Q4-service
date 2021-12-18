import { body, ValidationChain } from 'express-validator';
import * as tasksRepo from './task.memory.repository';
import { idValidation } from '../../utils/validation.helper';
import { Task } from './task.model';
import { TaskParams } from '../../models/interfaces';

export const getAll = (boardId: string): Promise<Task[]> => tasksRepo.getAll(boardId);
export const create = (value: TaskParams): Promise<Task> => tasksRepo.create(value);
export const getTask = (id: string): Promise<Task | undefined> => tasksRepo.getTask(id);
export const updateTask = (taskId: string, task: Task): Promise<Task | null | undefined> => tasksRepo.updateTask(taskId, task);
export const removeTask = (taskId: string): Promise<Task | null> => tasksRepo.removeTask(taskId);
export const deleteTasksByBoardId = (boardId: string): void => tasksRepo.deleteTasksByBoardId(boardId);
export const unassignUser = (userId: string): void => tasksRepo.unassignUser(userId);

export const validate = (method: string): ValidationChain[] => {
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
