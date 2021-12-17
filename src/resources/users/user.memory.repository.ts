import { User } from './user.model';

const data: User[] = [];

const getAll = async () => data;
const create = async (value) => {
  const user = new User(value);
  data.push(user);
  return user;
};

const getUser = async (id) => data.find((item) => item.id === id);

const updateUser = async (id, user) => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = user;
    return user;
  }
  return null;
};

const deleteUser = async (id) => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    const user = data[index];
    data.splice(index, 1);
    return user;
  }
  return null;
};

export { getAll, create, getUser, updateUser, deleteUser };
