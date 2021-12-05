const uuid = require('uuid');

class Column {
  constructor({
    id = uuid.v4(),
    title = 'title',
    order = 0,
  } = {}) {
    // this.tasksService = tasksService;
    this.id = id;
    this.title = title;
    this.order = order;
    this.tasks = [];
  }

  addTask(taskId) {
    this.tasks.push(taskId);
  }

  removeTask(taskId) {
    const index = this.tasks.findIndex((id) => id === taskId);

    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  // removeAllTasks() {
  //   this.tasks.forEach((id) => {
  //     this.tasksService.removeTaskFromWithBoard(id);
  //   })
  // }
}

module.exports = Column;