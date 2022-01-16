
import { body, ValidationChain } from 'express-validator';
import * as boardsRepo from './board.memory.repository';
import { idValidation } from '../../utils/validation.helper';
import * as tasksService from '../tasks/task.service';
import { Board } from './board.model';
import { BoardParams } from '../../models/interfaces';
import { Column } from './column.model';

/**
 * Returns all boards
 * @returns Promise<Board[]>
 */
const getAll = (): Promise<Board[]> => boardsRepo.getAll();

/**
 * Creates new board
 * @param value payload for new board creation
 * @returns Promise<Board>
 */
const create = (value: BoardParams): Promise<Board> => boardsRepo.create(value);

/**
 * Returns board by id
 * @param id board id
 * @returns Promise<Board | undefined>
 */
const getBoard = (id: string): Promise<Board | undefined> => boardsRepo.getBoard(id);

/**
 * Updates board by id
 * @param id board id
 * @param board updated board value
 * @returns Promise<Board | null>
 */
const updateBoard = (id: string, board: Board): Promise<Board | null> => boardsRepo.updateBoard(id, board);

/**
 * Removes board by id
 * @param id board id
 * @returns Promise<Board | null>
 */
const deleteBoard = async (boardId: string): Promise<Board | null> => {
  await tasksService.deleteTasksByBoardId(boardId);
  return boardsRepo.deleteBoard(boardId);
};

/**
 * Returns ValidationChain[]
 * @param method REST method name
 * @returns ValidationChain[]
 */
const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case 'create': {
     return [
        body('title', 'title doesn\'t exists').exists(),
        body('columns', 'columns doesn\'t exists').exists(),
        body('columns', 'all columns should have title and order').custom((value) => new Promise((resolve, reject) => {
            if (!value.some((column: Column) => Object.hasOwnProperty.call(column, 'title') && Object.hasOwnProperty.call(column, 'order'))) {
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
