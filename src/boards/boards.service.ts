import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardColumn } from './entities/column.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private columnsRepository: Repository<BoardColumn>
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = new Board();
    board.title = createBoardDto.title;
    await this.boardRepository.save(board);
  
    if (createBoardDto.columns) {
      const columnsEntity: BoardColumn[] = createBoardDto.columns.map((column: BoardColumn) => {
        const columnEntity = new BoardColumn();
        columnEntity.title = column.title;
        columnEntity.order = column.order;
        columnEntity.board = board;
        return columnEntity;
      });
      await Promise.all(columnsEntity.map((column: BoardColumn) => this.columnsRepository.save(column)));
    }
  
    const joinedBoard: Board = (await this.boardRepository.findOne(board.id, { relations: ["columns"] }) as Board);
    return joinedBoard;
  }

  /**
   * Returns all boards
   * @returns Promise<Board[]>
   */
  findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ["columns"] });
  }

  /**
   * Returns board by id
   * @param id board id
   * @returns Promise<Board | undefined>
   */
  async findOne(id: string): Promise<Board | undefined> {
    const board: Board | undefined = await this.boardRepository.findOne(id, { relations: ["columns"] });
    return board;
  }

  /**
   * Updates board by id
   * @param id board id
   * @param board updated board value
   * @returns Promise<Board | null>
   */
  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board | null> {
    const board = await this.boardRepository.findOne(id);
  
    if (board) {
      this.boardRepository.merge(board, updateBoardDto);
      const results = await this.boardRepository.save(board);
      return results;
    }
    return null;
  }

  /**
   * Removes board by id
   * @param id board id
   * @returns Promise<Board | null>
   */
  async remove(id: string): Promise<Board | null> {
    const board = await this.boardRepository.findOne(id);

    if (board) {
      const columns = await this.columnsRepository.find({ where: { board }});
  
      if (columns && columns.length > 0) {
        await this.columnsRepository.delete(columns.map((column: BoardColumn) => column.id));
      }
  
      const results = await this.boardRepository.delete(id);
    
      if (results && board) {
        return board;
      }
    }
    return null;
  }
}
