import { UserParams } from '../../models/interfaces';
import { User } from './user.model';

const data: User[] = [];

/**
 * Returns all users
 * @returns Promise<User[]>
 */
const getAll = async (): Promise<User[]> => data;

/**
 * Creates new user
 * @param value payload for new user creation
 * @returns Promise<User>
 */
const create = async (value: UserParams): Promise<User> => {
  const user = new User(value);
  data.push(user);
  return user;
};

/**
 * Returns user by id
 * @param id user id
 * @returns Promise<User | undefined>
 */
const getUser = async (id: string): Promise<User | undefined> => data.find((item) => item.id === id);

/**
 * Updates user by id
 * @param id user id
 * @param user updated user value
 * @returns Promise<User | null>
 */
const updateUser = async (id: string, user: User): Promise<User | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = user;
    return user;
  }
  return null;
};

/**
 * Removes user by id
 * @param id user id
 * @returns Promise<User | null>
 */
const deleteUser = async (id: string): Promise<User | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    const user = data[index];
    data.splice(index, 1);
    return user;
  }
  return null;
};

export { getAll, create, getUser, updateUser, deleteUser };
