const { body } = require('express-validator');
const usersRepo = require('./user.memory.repository');
const { idValidation } = require('../../utils/validation.helper');

const getAll = () => usersRepo.getAll();
const create = (value) => usersRepo.create(value);
const getUser = (id) => usersRepo.getUser(id);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = (id) => usersRepo.deleteUser(id);

const validate = (method) => {
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

module.exports = { getAll, validate, create, getUser, updateUser, deleteUser };
