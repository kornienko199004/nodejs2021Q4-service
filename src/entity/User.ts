import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Column as ColumnClass } from '../resources/boards/column.model';
// import { Column } from './column.model';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}


// @Entity()
// export class Board {

//   @PrimaryGeneratedColumn()
//   id!: string;

//   @Column()
//   title!: string;

//   @Column()
//   columns!: ColumnClass[];
// }
