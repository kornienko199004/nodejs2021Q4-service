import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { Logger } from '../logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    next();
    finished(res, () => {
      const ms = Date.now() - start;
      const { statusCode } = res;
      this.logger.logInfo(req, statusCode, ms);
    })
  }
}
