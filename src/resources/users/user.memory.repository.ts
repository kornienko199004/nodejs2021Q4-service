import { getRepository } from 'typeorm';
import { UserParams } from '../../models/interfaces';
import { User } from './user.model';
import { User as UserEntity } from '../../entity/User';
import { hashPassword } from '../../helpers/hashHelper';

/**
 * Returns all users
 * @returns Promise<User[]>
 */
const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find();
  return users;
};

/**
 * Creates new user
 * @param value payload for new user creation
 * @returns Promise<User>
 */
const create = async (value: UserParams): Promise<User> => {
  const userRepository = getRepository(UserEntity);
  const hashedPassword = await hashPassword(value.password);
  const user = userRepository.create({ ...value, password: hashedPassword });
  await userRepository.save(user);
  return user;
};

/**
 * Returns user by id
 * @param id user id
 * @returns Promise<User | undefined>
 */
const getUser = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(id);
  return user;
};

/**
 * Returns user by login
 * @param login user login
 * @returns Promise<User | undefined>
 */
const getUserByLogin = async (login: string): Promise<User | null> => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find({ where: { login } });

  if (users) {
    return users[0];
  }
  return null;
};

/**
 * Updates user by id
 * @param id user id
 * @param user updated user value
 * @returns Promise<User | null>
 */
const updateUser = async (id: string, value: User): Promise<User | null> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(id);

  if (user) {
    userRepository.merge(user, value);
    const results = await userRepository.save(user);
    return results;
  }
  return null;
};

/**
 * Removes user by id
 * @param id user id
 * @returns Promise<User | null>
 */
const deleteUser = async (id: string): Promise<User | null> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(id);
  const results = await userRepository.delete(id);

  if (results && user) {
    return user;
  }
  return null;
};

export { getAll, create, getUser, updateUser, deleteUser, getUserByLogin };
