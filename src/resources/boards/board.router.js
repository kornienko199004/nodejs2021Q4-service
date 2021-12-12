const router = require('express').Router();
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const boardsService = require('./board.service');
const { messages } = require('../../common/constants');

const tasksRouter = require('../tasks/task.router');

router.use('/:boardId/tasks', tasksRouter);

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(boardsService.validate('create'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const board = await boardsService.create(req.body);
    return res.status(StatusCodes.CREATED).json(board);
  });

router.route('/:id').get(boardsService.validate('getBoard'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const id = req.params?.id;
  const board = await boardsService.getBoard(id);

  if (board) {
    return res.json(board);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Board') });
})
.put(boardsService.validate('updateBoard'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const board = await boardsService.updateBoard(id, req.body);

  if (board) {
    return res.json(board);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.delete(boardsService.validate('deleteBoard'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const board = await boardsService.deleteBoard(id);

  if (board) {
    return res.status(StatusCodes.NO_CONTENT).json({ message: messages.deleted('Board') });
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Board') });
});

module.exports = router;