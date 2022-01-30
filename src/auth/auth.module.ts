import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, TasksService]
})
export class AuthModule {}
