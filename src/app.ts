import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { finished } from 'stream';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import { Logger } from './logger/logger';
import { ValidationError } from './common/validationError';


const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const logger = new Logger();

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

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

// app.use((err: Error, _: Request, res: Response, next: () => unknown) => logger.loggerErrorMiddleware(err, _, res, next));
app.use((err: Error, _: Request, res: Response, next: (arg: Error) => unknown): void => {
    if (err instanceof ValidationError) {
      logger.logError(err);
      res.status(err.status).json({ errors: err.text });
      return;
    }
    next(err);
  }
  // public loggerErrorMiddleware(err: Error, _: Request, res: Response, next: (arg: Error) => unknown): void {
  //   if (err instanceof ValidationError) {
  //     this.logger.error(err.message);
  //     res.status(err.status).json(err.text);
  //     return;
  //   }
  //   next(err);
  // }
)

export default app;
