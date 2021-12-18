import { BoardParams } from '../../models/interfaces';
import { Board } from './board.model';

const data: Board[] = [];

const getAll = async (): Promise<Board[]> =>
  data;

const create = async (value: BoardParams): Promise<Board> => {
  const board = new Board(value);
  data.push(board);
  return board;
};

const getBoard = async (id: string): Promise<Board | undefined> => data.find((item) => item.id === id);

const updateBoard = async (id: string, board: Board): Promise<Board | null> => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = board;
    return board;
  }
  return null;
};

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
