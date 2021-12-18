import { UserParams } from '../../models/interfaces';
import { User } from './user.model';

const data: User[] = [];

const getAll = async (): Promise<User[]> => data;
const create = async (value: UserParams): Promise<User> => {
  const user = new User(value);
  data.push(user);
  return user;
};

const getUser = async (id: string): Promise<User | undefined> => data.find((item) => item.id === id);

const updateUser = async (id: string, user: User): Promise<User | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = user;
    return user;
  }
  return null;
};

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
