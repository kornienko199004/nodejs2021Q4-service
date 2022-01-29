import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { messages } from '../../common/constants';
import * as boardsService from './board.service';
import tasksRouter from '../tasks/task.router';
import { ValidationError } from '../../common/validationError';

const router = express.Router();

router.use('/:boardId/tasks', tasksRouter);

router
  .route('/')
  .get(async (_: Request, res: Response) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(boardsService.validate('create'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }

    const board = await boardsService.create(req.body);
    return res.status(StatusCodes.CREATED).json(board);
  });

router.route('/:id').get(boardsService.validate('getBoard'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }

  const id = req.params?.id;
  const board = await boardsService.getBoard(id);

  if (board) {
    return res.json(board);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Board') });
})
.put(boardsService.validate('updateBoard'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }
  const id = req.params?.id;
  const board = await boardsService.updateBoard(id, req.body);

  if (board) {
    return res.json(board);
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.delete(boardsService.validate('deleteBoard'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }
  const id = req.params?.id;
  const board = await boardsService.deleteBoard(id);

  if (board) {
    return res.status(StatusCodes.NO_CONTENT).json({ message: messages.deleted('Board') });
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('Board') });
});

export default router;
