import { body, ValidationChain } from 'express-validator';
import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { idValidation } from '../../utils/validation.helper';
import { User } from './user.model';
import { UserParams } from '../../models/interfaces';

/**
 * Returns all users
 * @returns Promise<User[]>
 */
export const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Creates new user
 * @param value payload for new user creation
 * @returns Promise<User>
 */
export const create = (value: UserParams): Promise<User> => usersRepo.create(value);

/**
 * Returns user by id
 * @param id user id
 * @returns Promise<User | undefined>
 */
export const getUser = (id: string): Promise<User | undefined> => usersRepo.getUser(id);

/**
 * Returns user by login
 * @param login user login
 * @returns Promise<User | undefined>
 */
export const getUserByLogin = (login: string): Promise<User | null> => usersRepo.getUserByLogin(login);

/**
 * Updates user by id
 * @param id user id
 * @param user updated user value
 * @returns Promise<User | null>
 */
export const updateUser = (id: string, user: User): Promise<User | null> => usersRepo.updateUser(id, user);

/**
 * Removes user by id
 * @param id user id
 * @returns Promise<User | null>
 */
export const deleteUser = (id: string): Promise<User | null> => {
  tasksService.unassignUser(id);
  return usersRepo.deleteUser(id);
};

/**
 * Returns ValidationChain[]
 * @param method REST method name
 * @returns ValidationChain[]
 */
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
