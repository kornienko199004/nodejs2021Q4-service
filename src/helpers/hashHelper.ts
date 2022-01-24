import { hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from '../common/config';

/**
 * Make password hashed
 * @param password user password
 * @returns hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await hash(password, Number(SALT_ROUNDS) || 10);
  return hashedPassword;
};

/**
 * Compares password and hashedPassword
 * @param password user password
 * @param hashedPassword hashed password
 * @returns passwords are equal
 */
 export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const passwordsEqual = await compare(password, hashedPassword);
  return passwordsEqual;
};