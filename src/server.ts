import { createConnection } from 'typeorm';
import { PORT, POSTGRES_PORT, TYPEORM_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD } from './common/config';
import app from './app';
import { logger } from './logger/logger';

createConnection(
  {
    type: 'postgres',
    host: TYPEORM_HOST,
    port: Number.parseInt(POSTGRES_PORT as string, 10) ,
    username: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    synchronize: true,
    entities: ["src/entity/*.ts"]
  }
).then(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
}).catch(error => {
  console.log("TypeORM connection error: ", error);
  logger.logError(new Error(`TypeORM connection error: ${error}`));
});
