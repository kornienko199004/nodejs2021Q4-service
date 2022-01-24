import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { getToken, validate } from './auth.service';

const router = express.Router();

router
  .route('/')
  .post(validate('login'), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid password or login' });
    }

    const token = await getToken(req.body);
    if (token) {
      return res.status(StatusCodes.OK).json({ token });
    }
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid password or login' });
  });

export default router;
