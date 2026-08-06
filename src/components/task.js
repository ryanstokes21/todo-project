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

function renderTasks(container, list) {
  for (const task of list) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const title = document.createElement('h2');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = task.dueDate;

    const priority = document.createElement('p');
    priority.textContent = task.priority;

    taskCard.append(title, description, dueDate, priority);

    container.append(taskCard);
  }
}

export { taskList, addTaskToList, renderTasks };
