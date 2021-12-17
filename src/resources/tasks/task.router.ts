import express from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import * as tasksService from './task.service';
import * as boardsService from '../boards/board.service';
import { messages } from '../../common/constants';

const router = express.Router({ mergeParams: true });

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
    const tasks = await tasksService.getAll((req.params as any)?.boardId);
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

export default router;
