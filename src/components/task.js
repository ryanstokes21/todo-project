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

  isToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(`${this.dueDate}T00:00:00`);

    return taskDate.toDateString() === today.toDateString();
  }

  isUpcoming(days = 5) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(`${this.dueDate}T00:00:00`);

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + days);

    return taskDate > today && taskDate <= endDate;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

function addTaskToList(title, description, dueDate, priority) {
  const task = new Task(title, description, dueDate, priority);

  taskList.push(task);
  saveTask(taskList);
}

function renderTasks(container, list) {
  container.textContent = '';
  for (const task of list) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const title = document.createElement('h2');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const meta = document.createElement('div');
    meta.classList.add('task-meta');

    const dueDate = document.createElement('span');
    dueDate.textContent = `📅 ${task.dueDate || 'No due date'}`;

    const priority = document.createElement('span');
    priority.textContent = `🔥 ${task.priority}`;

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = task.completed ? '✓ Completed' : 'Complete';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    meta.append(dueDate, priority);

    actions.append(completeBtn, deleteBtn);

    taskCard.append(title, description, meta, actions);

    container.append(taskCard);
  }
}

export { taskList, addTaskToList, renderTasks };
