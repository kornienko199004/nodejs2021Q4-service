import { BoardParams } from '../../models/interfaces';
import { Board } from './board.model';

const data: Board[] = [];

/**
 * Returns all boards
 * @returns Promise<Board[]>
 */
const getAll = async (): Promise<Board[]> =>
  data;

/**
 * Creates new board
 * @param value payload for new board creation
 * @returns Promise<Board>
 */
const create = async (value: BoardParams): Promise<Board> => {
  const board = new Board(value);
  data.push(board);
  return board;
};

/**
 * Returns board by id
 * @param id board id
 * @returns Promise<Board | undefined>
 */
const getBoard = async (id: string): Promise<Board | undefined> => data.find((item) => item.id === id);

/**
 * Updates board by id
 * @param id board id
 * @param board updated board value
 * @returns Promise<Board | null>
 */
const updateBoard = async (id: string, board: Board): Promise<Board | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = board;
    return board;
  }
  return null;
};

/**
 * Removes board by id
 * @param id board id
 * @returns Promise<Board | null>
 */
const deleteBoard = async (id: string): Promise<Board | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    const board = data[index];
    data.splice(index, 1);
    return board;
  }
  return null;
};

export { getAll, create, getBoard, updateBoard, deleteBoard };
