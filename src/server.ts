import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';
import { logger } from './logger/logger';

createConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
}).catch(error => {
  console.log("TypeORM connection error: ", error);
  logger.logError(new Error(`TypeORM connection error: ${error}`));
});
