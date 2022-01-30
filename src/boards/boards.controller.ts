import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Board | undefined> {
    const result = await this.boardsService.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<Board | null> {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Board | null> {
    const result = await this.boardsService.remove(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
