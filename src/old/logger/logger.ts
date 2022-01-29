import { Request } from "express";
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { ValidationError } from "../common/validationError";

class Logger {
  logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: 'nodejs2021Q4-service' },
      transports: [
        new transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
      ]
    });
  }

  private static getLogString(req: Request, statusCode: number, ms: number): string {
    const { method, url, query, body } = req;
    let str = `${method} ${url} ${statusCode}`;

    if (query && Object.keys(query).length > 0) {
      str = `${str} ${JSON.stringify(query)}`;
    }

    if (body && Object.keys(body).length > 0) {
      str = `${str} ${JSON.stringify(body)}`;
    }
    return `${str} [${ms}ms]`
  }

  public logInfo(req: Request, statusCode: number, ms: number): void {
    this.logger.log('info', Logger.getLogString(req, statusCode, ms));
  }

  public logError(err: Error): void {
    if (err instanceof ValidationError) {
      this.logger.error(`${err.status} ${JSON.stringify(err.message)}`);
    }
    this.logger.error(err.message);
  }
}

export const logger = new Logger();
