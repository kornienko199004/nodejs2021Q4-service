import { body, ValidationChain } from 'express-validator';
import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { idValidation } from '../../utils/validation.helper';
import { User } from './user.model';
import { UserParams } from '../../models/interfaces';

export const getAll = (): Promise<User[]> => usersRepo.getAll();
export const create = (value: UserParams): Promise<User> => usersRepo.create(value);
export const getUser = (id: string): Promise<User | undefined> => usersRepo.getUser(id);
export const updateUser = (id: string, user: User): Promise<User | null> => usersRepo.updateUser(id, user);
export const deleteUser = (id: string): Promise<User | null> => {
  tasksService.unassignUser(id);
  return usersRepo.deleteUser(id);
};

export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case 'createUser': {
     return [
        body('name', 'name doesn\'t exists').exists(),
        body('login', 'login doesn\'t exists').exists(),
        body('password', 'password doesn\'t exists').exists(),
       ];
    }
    case 'deleteUser':
    case 'getUser': {
     return [
        idValidation()
       ];
    }
    case 'updateUser': {
      return [
         idValidation(),
         body('name', 'name doesn\'t exists').exists(),
         body('login', 'login doesn\'t exists').exists(),
        ];
    }
    default:
      return [];
  }
}
