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

@Module({
  imports: [
    TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "password",
    "database": "test",
    "entities": [User, Board, BoardColumn, Task],
    "synchronize": true
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule
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
