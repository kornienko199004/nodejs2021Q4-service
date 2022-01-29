import { v4 } from 'uuid';
import { BoardParams } from '../../models/interfaces';
import { Column } from './column.model';

export class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = v4(),
    title = 'title',
    columns = [],
  }: BoardParams) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}
