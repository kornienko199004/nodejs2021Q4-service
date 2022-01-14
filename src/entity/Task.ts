import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  userId!: string;

  @Column()
  boardId!: string;

  @Column()
  columnId!: string;

  @Column()
  order!: number;
}
