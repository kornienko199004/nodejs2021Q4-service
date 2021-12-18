import { Column } from '../resources/boards/column.model';

export interface BoardParams {
  id?: string;
  title: string;
  columns?: Column[]
}

export interface UserParams {
  id?: string;
  name: string;
  login: string;
  password: string;
}

export interface TaskParams {
  id?: string;
  title: string;
  description: string;
  order: number;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}