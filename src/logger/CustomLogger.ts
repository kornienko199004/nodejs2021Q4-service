import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from './logger';

@Injectable()
export class CustomLogger implements LoggerService {
  constructor(private logger: Logger) {}

  log(message: string): void {
    this.logger.logMessage(message);
  }

  error(message: string): void {
    this.logger.logError(new Error(message));
  }

  warn(message: string): void {
    this.logger.logMessage(message);
  }
}