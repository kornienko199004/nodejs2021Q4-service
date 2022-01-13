import { Entity, PrimaryGeneratedColumn, Column as OrmColumn } from 'typeorm';
import { v4 } from 'uuid';
import { BoardParams } from '../../models/interfaces';
import { Column } from '../resources/boards/column.model';
// import { Column } from './column.model';

@Entity()
export class Board {

  @PrimaryGeneratedColumn()
  id!: string;

  @OrmColumn()
  title!: string;

  @OrmColumn()
  columns!: Column[];
}
