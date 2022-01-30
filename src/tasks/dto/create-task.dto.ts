export class CreateTaskDto {
  id: string;

  title: string;

  description: string;

  userId?: string;

  boardId?: string;

  columnId?: string;

  order: number;

  constructor(value: {
    id: string;
    title: string;
    description: string;
    order: number;
    userId?: string;
    boardId?: string;
    columnId?: string;
  }) {
    this.id = value.id;
    this.title = value.title;
    this.description = value.description;
    this.order = value.order;

    if (value.userId) {
      this.userId = value.userId;
    }

    if (value.boardId) {
      this.boardId = value.boardId;
    }

    if (value.columnId) {
      this.columnId = value.columnId;
    }
  }
}
