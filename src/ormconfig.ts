import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, './.env')
});


const { CONNECTION, HOST, POSTGRES_PORT, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER } = process.env;

export default {
  type: CONNECTION,
  host: HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  "entities": [
      "src/entity/**/*.ts"
  ],
  "migrations": [
       "src/migrations/**/*.ts"
  ],
  "subscribers": [
      "src/subscriber/**/*.ts"
  ],
  "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migrations",
      "subscribersDir": "src/subscriber"
  }
};