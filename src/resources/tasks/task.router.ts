const router = require('express').Router({ mergeParams: true });
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const tasksService = require('./task.service');
const { messages } = require('../../common/constants');
const boardsService = require('../boards/board.service');

router.use(async (req, res, next) => {
  const board = await boardsService.getBoard(req.params?.boardId);

  if (!board && req.params?.boardId) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Board') });
  }
  return next();
});
router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params?.boardId);
    res.json(tasks);
  })
  .post(tasksService.validate('create'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const task = await tasksService.create({ ...req.body, boardId: req.params?.boardId });
    return res.status(StatusCodes.CREATED).json(task);
  });

router.route('/:id').get(tasksService.validate('getTask'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const id = req.params?.id;
  const task = await tasksService.getTask(id);

  if (task) {
    return res.json(task);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Task') });
})
.put(tasksService.validate('updateTask'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const task = await tasksService.updateTask(id, req.body);

  if (task) {
    return res.json(task);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Task') });
})
.delete(tasksService.validate('deleteTask'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const task = await tasksService.removeTask(id);
  if (task) {
    return res.status(StatusCodes.NO_CONTENT).json({ message: messages.deleted('Task') });
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Task') });
});

module.exports = router;
