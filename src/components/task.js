import { saveTask } from '../../storage/storage.js';
import renderCompleted from './completed.js';
import renderInbox from './inbox.js';
import renderToday from './today.js';
import renderUpcomingTasks from './upcoming.js';

const taskList = [];

class Task {
  constructor(title, description, dueDate, priority, projectId = null) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
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

function addTaskToList(
  title,
  description,
  dueDate,
  priority,
  projectId = null,
) {
  const task = new Task(title, description, dueDate, priority, projectId);

  taskList.push(task);
  saveTask(taskList);
}

function deleteTask(id) {
  const index = taskList.findIndex((task) => task.id === id);

  if (index !== -1) {
    taskList.splice(index, 1);
    saveTask(taskList);
  }
}

function completeTask(id) {
  const task = taskList.find((task) => task.id === id);

  if (!task) return;

  task.toggleCompleted();
  saveTask(taskList);
}

function refreshTasks() {
  renderInbox();
  renderToday();
  renderUpcomingTasks();
  renderCompleted();
}

function renderTasks(container, list, onChange = refreshTasks) {
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
    completeBtn.dataset.id = task.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = task.id;

    meta.append(dueDate, priority);
    actions.append(completeBtn, deleteBtn);
    taskCard.append(title, description, meta, actions);
    container.append(taskCard);
  }

  container.onclick = (e) => {
    const id = e.target.dataset.id;
    const deleteBtn = e.target.classList.contains('delete-btn');
    const completeBtn = e.target.classList.contains('complete-btn');

    if (!deleteBtn && !completeBtn) return;

    if (deleteBtn) {
      deleteTask(id);
    }

    if (completeBtn) {
      completeTask(id);
    }

    onChange();
  };
}

export { taskList, addTaskToList, renderTasks, Task, refreshTasks };
