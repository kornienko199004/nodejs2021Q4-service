import { ConnectionOptions, createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';
import { logger } from './logger/logger';
import config from './ormconfig'

createConnection(config as ConnectionOptions).then(async (connection) => {
  try {
    await connection.runMigrations();
    console.log('migration ok');
  } catch (e) {
    console.log('migration', e);
    logger.logError(new Error(`Migration error: ${e}`));
  }
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
}).catch(error => {
  console.log("TypeORM connection error: ", error);
  logger.logError(new Error(`TypeORM connection error: ${error}`));
});
