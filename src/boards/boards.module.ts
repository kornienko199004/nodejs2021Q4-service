import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { BoardColumn } from './entities/column.entity';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardColumn, Task]),
    TasksModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService]
})
export class BoardsModule {}
