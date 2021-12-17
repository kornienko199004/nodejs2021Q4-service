import uuid from 'uuid';

export class Column {
  id: string;
  title: string;
  order: number;

  constructor({
    id = uuid.v4(),
    title = 'title',
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;