import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    nullable: true,
  })
  userId!: string;

  @Column({
    nullable: true,
  })
  boardId!: string;

  @Column({
    nullable: true,
  })
  columnId!: string;

  @Column()
  order!: number;
}
