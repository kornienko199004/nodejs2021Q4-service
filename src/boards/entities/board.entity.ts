import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn } from './column.entity';

@Entity()
export class Board {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumn, boardColumn => boardColumn.board, {
    cascade: true,
  })
  columns!: BoardColumn[];
}