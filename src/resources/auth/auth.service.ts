
import { body, ValidationChain } from 'express-validator';
import * as boardsRepo from './board.memory.repository';
import { idValidation } from '../../utils/validation.helper';
import * as tasksService from '../tasks/task.service';
import { Board } from './board.model';
import { BoardParams, UserParams } from '../../models/interfaces';
import { Column } from './column.model';
import * as usersService from '../users/user.service';
import { User } from '../../entity/User';
import { checkPassword } from '../../helpers/hashHelper';
import { AuthError } from '../../common/authError';

/**
 * Creates new board
 * @param value payload for new board creation
 * @returns Promise<Board>
 */
export const getToken = async (value: UserParams): Promise<string | null> => {
  const user: User | null = await usersService.getUserByLogin(value.login);

  if (!user) {
    return null;
  }

  const passwordsEqual = await checkPassword(value.password, user.password);
  if (passwordsEqual) {
    return '';
  }

  throw new AuthError();
};
