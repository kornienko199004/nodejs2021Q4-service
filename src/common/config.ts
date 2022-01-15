
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const { TYPEORM_HOST } = process.env;
export const { POSTGRES_PORT } = process.env;
export const { POSTGRES_USER } = process.env;
export const { POSTGRES_PASSWORD } = process.env;
export const { POSTGRES_DB } = process.env;
