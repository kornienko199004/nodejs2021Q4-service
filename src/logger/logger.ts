import { Errback, Request, Response } from "express";
import { finished } from "stream";
import morgan from 'morgan';
import { createWriteStream } from "fs";
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { ValidationError } from "../common/validationError";

export class Logger {
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
      defaultMeta: { service: 'your-service-name' },
      transports: [
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new transports.File({ filename: 'quick-start-error.log', level: 'error' }),
        new transports.File({ filename: 'quick-start-combined.log' })
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

  public loggerErrorMiddleware(err: Error, _: Request, res: Response, next: (arg: Error) => unknown): void {
    if (err instanceof ValidationError) {
      this.logger.error(err.message);
      res.status(err.status).json(err.text);
      return;
    }
    next(err);
  }

  // public static loggerMiddleware(): (req: Request, res: Response, callback: (err?: Error) => void) => void {
  //   return morgan('combined', {stream: createWriteStream('access.log')})
  // }
}


