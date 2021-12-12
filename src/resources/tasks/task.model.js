const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'title',
    description = 'description',
    userId,
    boardId,
    columnId,
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
