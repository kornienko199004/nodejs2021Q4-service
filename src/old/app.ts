import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { finished } from 'stream';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import authRouter from './resources/auth/auth.router';
import { logger } from './logger/logger';
import { ValidationError } from './common/validationError';
import { AuthMiddleware } from './resources/auth/auth.middleware';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req: Request, res: Response, next: () => unknown) => {
  const start = Date.now();
  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.logInfo(req, statusCode, ms);
  })
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(AuthMiddleware.checkToken);
app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.use((err: Error, _: Request, res: Response, next: (arg: Error) => unknown): void => {
    if (err instanceof ValidationError) {
      logger.logError(err);
      res.status(err.status).json({ errors: err.text });
      return;
    }
    next(err);
  }
);

process.on('uncaughtException', (error: Error) => {
  logger.logError(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.logError(reason);
});

export default app;
