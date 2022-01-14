import { getRepository } from 'typeorm';
import { BoardParams } from '../../models/interfaces';
import { Board } from './board.model';
import { Board as BoardEntity } from '../../entity/Board';
import { BoardColumn } from '../../entity/Column';
import { Column } from './column.model';

/**
 * Returns all boards
 * @returns Promise<Board[]>
 */
const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(BoardEntity);
  const boards = await boardRepository.find({ relations: ["columns"] });
  return boards;
}

/**
 * Creates new board
 * @param value payload for new board creation
 * @returns Promise<Board>
 */
const create = async (value: BoardParams): Promise<Board> => {
  const columnRepository = getRepository(BoardColumn);
  const boardRepository = getRepository(BoardEntity);
  
  const board = new BoardEntity();
  board.title = value.title;
  await boardRepository.save(board);

  if (value.columns) {
    const columnsEntity: BoardColumn[] = value.columns.map((column: Column) => {
      const columnEntity = new BoardColumn();
      columnEntity.title = column.title;
      columnEntity.order = column.order;
      columnEntity.board = board;
      return columnEntity;
    });
    await Promise.all(columnsEntity.map((column: BoardColumn) => columnRepository.save(column)));
  }

  const joinedBoard: BoardEntity = (await boardRepository.findOne(board.id, { relations: ["columns"] }) as BoardEntity);
  return joinedBoard;
};

/**
 * Returns board by id
 * @param id board id
 * @returns Promise<Board | undefined>
 */
const getBoard = async (id: string): Promise<Board | undefined> => {
  const boardRepository = getRepository(BoardEntity);
  const board: BoardEntity | undefined = await boardRepository.findOne(id, { relations: ["columns"] });
  return board;
}

/**
 * Updates board by id
 * @param id board id
 * @param board updated board value
 * @returns Promise<Board | null>
 */
const updateBoard = async (id: string, value: Board): Promise<Board | null> => {
  const boardRepository = getRepository(BoardEntity);
  const board = await boardRepository.findOne(id);

  if (board) {
    boardRepository.merge(board, value);
    const results = await boardRepository.save(board);
    return results;
  }
  return null;
};

/**
 * Removes board by id
 * @param id board id
 * @returns Promise<Board | null>
 */
const deleteBoard = async (id: string): Promise<Board | null> => {
  const boardRepository = getRepository(BoardEntity);
  const board = await boardRepository.findOne(id);
  const results = await boardRepository.delete(id);

  if (results && board) {
    return board;
  }
  return null;
};

export { getAll, create, getBoard, updateBoard, deleteBoard };
