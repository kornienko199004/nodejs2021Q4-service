import express, { Request, Response, Errback } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import { Logger } from './logger/logger';
import { ValidationError } from './common/validationError';


const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const logger = new Logger();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((...args) => logger.loggerMiddleware(...args));


app.use((err: Errback, _: Request, res: Response, next: () => unknown) => {
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.text);
    return;
  }
  next();
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

export default app;
