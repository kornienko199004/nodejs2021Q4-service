import { body, ValidationChain } from 'express-validator';
import * as tasksRepo from './task.memory.repository';
import { idValidation } from '../../utils/validation.helper';
import { Task } from './task.model';
import { TaskParams } from '../../models/interfaces';

/**
 * Returns all tasks
 * @returns Promise<Task[]>
 */
export const getAll = (boardId: string): Promise<Task[]> => tasksRepo.getAll(boardId);

/**
 * Creates new task
 * @param value payload for new task creation
 * @returns Promise<Task>
 */
export const create = (value: TaskParams): Promise<Task> => tasksRepo.create(value);

/**
 * Returns task by id
 * @param id task id
 * @returns Promise<Task | undefined>
 */
export const getTask = (id: string): Promise<Task | undefined> => tasksRepo.getTask(id);

/**
 * Updates task by id
 * @param id board id
 * @param board updated task value
 * @returns Promise<Task | null | undefined>
 */
export const updateTask = (taskId: string, task: Task): Promise<Task | null | undefined> => tasksRepo.updateTask(taskId, task);

/**
 * Removes task by id
 * @param id task id
 * @returns Promise<Task | null>
 */
export const removeTask = (taskId: string): Promise<Task | null> => tasksRepo.removeTask(taskId);

/**
 * Removes tasks by boardId
 * @param boardId board id for delete
 * @returns Void
 */
export const deleteTasksByBoardId = (boardId: string): Promise<void> => tasksRepo.deleteTasksByBoardId(boardId);

/**
 * Unassign user by user id
 * @param userId user id for unassign
 * @returns Void
 */
export const unassignUser = (userId: string): Promise<void> => tasksRepo.unassignUser(userId);

/**
 * Returns ValidationChain[]
 * @param method REST method name
 * @returns ValidationChain[]
 */
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
