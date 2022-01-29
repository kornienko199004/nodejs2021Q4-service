import { v4 } from 'uuid';
import { TaskParams } from '../../models/interfaces';

export class Task {
  id: string;

  title: string;

  description: string;

  userId?: string;

  boardId?: string;

  columnId?: string;

  order: number;

  constructor({
    id = v4(),
    title = 'title',
    description = 'description',
    order = 0,
    userId,
    boardId,
    columnId,
  }: TaskParams) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    // this.userId = userId;
    // this.boardId = boardId;
    // this.columnId = columnId;
  }
}
