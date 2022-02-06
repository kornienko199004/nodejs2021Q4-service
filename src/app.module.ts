import dotenv from 'dotenv';
import path from 'path';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { BoardColumn } from './boards/entities/column.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { TasksController } from './tasks/tasks.controller';
import { BoardsController } from './boards/boards.controller';
import { Logger } from './logger/logger';
import { CustomLogger } from './logger/CustomLogger';
import { FilesModule } from './files/files.module';
import { File } from './files/entities/file.entity';
import { migrationName1644082567901 } from './migrations/1644082567901-migrationName';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const { CONNECTION, HOST, POSTGRES_PORT, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
    "type": CONNECTION as "aurora-data-api",
    "host": HOST,
    "port": POSTGRES_PORT as unknown as number,
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DB,
    "entities": [User, Board, BoardColumn, Task, File],
    "migrations": [migrationName1644082567901],
    "synchronize": false
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    FilesModule
  ],
  providers: [Logger, CustomLogger, ValidationPipe],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController, TasksController, BoardsController);
  }
}
