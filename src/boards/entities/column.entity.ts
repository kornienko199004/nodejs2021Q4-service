import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class BoardColumn {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  order!: number;

  @Column()
  title!: string;

  @ManyToOne(() => Board, board => board.columns)
  board!: Board;
}
