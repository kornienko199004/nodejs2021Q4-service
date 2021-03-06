import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';
import * as usersService from './user.service';
import { messages } from '../../common/constants';
import { ValidationError } from '../../common/validationError';

const router = express.Router();

router.route('/').get(async (_, res: Response) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(usersService.validate('createUser'), async (req: Request, res: Response, next: (arg: Error) => unknown)  =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }

  const user = await usersService.create(req.body);
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').get(usersService.validate('getUser'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }

  const id = req.params?.id;
  const user = await usersService.getUser(id);

  if (user) {
    return res.json(User.toResponse(user));
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.put(usersService.validate('updateUser'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }
  const id = req.params?.id;
  const user = await usersService.updateUser(id, req.body);

  if (user) {
    return res.json(User.toResponse(user));
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.delete(usersService.validate('deleteUser'), async (req: Request, res: Response, next: (arg: Error) => unknown) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }
  const id = req.params?.id;
  const user = await usersService.deleteUser(id);

  if (user) {
    return res.status(StatusCodes.NO_CONTENT).json({ message: messages.deleted('User') });
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
});

export default router;
