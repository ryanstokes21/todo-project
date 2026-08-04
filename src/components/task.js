import { saveTask } from '../../storage/storage.js';

const taskList = [];

class Task {
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

function addTaskToList(title, description, dueDate, priority) {
  const task = new Task(title, description, dueDate, priority);

  taskList.push(task);
  saveTask(taskList);
}

export { taskList, addTaskToList };
