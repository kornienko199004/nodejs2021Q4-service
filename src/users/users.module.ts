import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    TasksModule
  ],
  controllers: [UsersController],
  providers: [UsersService, TasksService]
})
export class UsersModule {}
