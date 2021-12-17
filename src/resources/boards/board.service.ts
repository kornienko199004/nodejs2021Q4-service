
import { body } from 'express-validator';
import * as boardsRepo from './board.memory.repository';
import { idValidation } from '../../utils/validation.helper';
import * as tasksService from '../tasks/task.service';

const getAll = () => boardsRepo.getAll();
const create = (value) => boardsRepo.create(value);
const getBoard = (id) => boardsRepo.getBoard(id);
const updateBoard = (id, user) => boardsRepo.updateBoard(id, user);
const deleteBoard = (boardId) => {
  tasksService.deleteTasksByBoardId(boardId);
  return boardsRepo.deleteBoard(boardId);
};


const validate = (method) => {
  switch (method) {
    case 'create': {
     return [
        body('title', 'title doesn\'t exists').exists(),
        body('columns', 'columns doesn\'t exists').exists(),
        body('columns', 'all columns should have title and order').custom((value) => new Promise((resolve, reject) => {
            if (!value.some((column) => Object.hasOwnProperty.call(column, 'title') && Object.hasOwnProperty.call(column, 'order'))) {
              reject();
            }
            resolve(null);
          })),
       ];
    }
    case 'deleteBoard':
    case 'getBoard': {
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

export { getAll, validate, create, getBoard, updateBoard, deleteBoard };
