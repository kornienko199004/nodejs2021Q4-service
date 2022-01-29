
import { body, ValidationChain } from 'express-validator';
import { UserParams } from '../../models/interfaces';
import * as usersService from '../users/user.service';
import { User } from '../../entity/User';
import { checkPassword } from '../../helpers/hashHelper';
import { TokenHelper } from '../../helpers/token.helper';

/**
 * Creates new board
 * @param value payload for new board creation
 * @returns Promise<Board>
 */
export const getToken = async (value: UserParams): Promise<string | null> => {
  const user: User | null = await usersService.getUserByLogin(value.login);

  if (user) {
    const passwordsEqual = await checkPassword(value.password, user.password);
    if (passwordsEqual) {
      return TokenHelper.generateToken(user.id, user.login);
    }
  }

  return null;
};

/**
 * Returns ValidationChain[]
 * @param method REST method name
 * @returns ValidationChain[]
 */
export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case 'login': {
     return [
        body('login', 'Invalid password or login').exists(),
        body('password', 'Invalid password or login').exists(),
       ];
    }
    default:
      return [];
  }
}
