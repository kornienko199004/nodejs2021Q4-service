const uuid = require('uuid');

const Column = require('./column.model');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'title',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
    const column = this.columns.find((item) => item.id === task.columnId);
    if (column) {
      column.addTask(task.id);
    }
  }

  removeTask(taskId) {
    const indexInTasks = this.tasks.findIndex((item) => item.id === taskId);
    let task;
    if (indexInTasks > -1) {
      task = this.tasks[indexInTasks];
      this.tasks.splice(indexInTasks, 1);
    }

    if (task && task.columnId) {
      const index = this.columns.findIndex((column) => column.id === task.columnId);
  
      if (index > -1) {
        this.columns.removeTask(task.id);
      }
    }

    return task;
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(taskId, task) {
    const index = this.tasks.findIndex((item) => item.id === taskId);
    if (index > -1) {
      this.tasks[index] = task;
      return task;
    }

    return null;
  }
}

module.exports = Board;
