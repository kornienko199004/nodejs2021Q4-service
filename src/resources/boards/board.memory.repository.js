const Board = require('./board.model');

const data = [];

const getAll = async () =>
  data;

const create = async (value) => {
  const board = new Board(value);
  data.push(board);
  return board;
};

const getBoard = async (id) => data.find((item) => item.id === id);

const updateBoard = async (id, board) => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    data[index] = board;
    return board;
  }
  return null;
};

const deleteBoard = async (id) => {
  const index = data.findIndex((item) => item.id === id);
  if (index > -1) {
    const board = data[index];
    data.splice(index, 1);
    return board;
  }
  return null;
};

module.exports = { getAll, create, getBoard, updateBoard, deleteBoard };
