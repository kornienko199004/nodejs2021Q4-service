import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create({ ...createTaskDto, boardId });
  }

  @Get()
  findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | undefined> {
    const result: Task | undefined = await this.tasksService.findOne(id);
    if (!result) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task | null | undefined> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task | null> {
    const result: Task | null = await this.tasksService.remove(id);
    if (!result) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
}
