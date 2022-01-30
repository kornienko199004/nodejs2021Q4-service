import { BoardColumn } from "../entities/column.entity";

export class CreateBoardDto {
  id?: string;

  title: string;

  columns?: BoardColumn[];

  constructor(value: {
    id?: string,
    title: string,
    columns?: BoardColumn[],
  }) {
    this.id = value.id;
    this.title = value.title;
    this.columns = value.columns;
  }}
