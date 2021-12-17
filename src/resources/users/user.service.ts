import { body } from 'express-validator';
import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { idValidation } from '../../utils/validation.helper';

export const getAll = () => usersRepo.getAll();
export const create = (value) => usersRepo.create(value);
export const getUser = (id) => usersRepo.getUser(id);
export const updateUser = (id, user) => usersRepo.updateUser(id, user);
export const deleteUser = (id) => {
  tasksService.unassignUser(id);
  return usersRepo.deleteUser(id);
};

export const validate = (method) => {
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
