import { loadTasks } from '../storage/storage.js';
import { addTaskToList, taskList } from './components/task.js';
import './css/main.css';
import loadPage from './router/tabs.js';
import renderTasks from './ui/inbox.js';

const el = {
  content: document.getElementById('content'),
  navTab: document.getElementById('nav-tab'),
  openDialog: document.getElementById('open-task-dialog'),
  dialog: document.getElementById('task-dialog'),
  createTaskBtn: document.getElementById('create-task-btn'),
};

const formEl = {
  form: document.getElementById('task-form'),
  title: document.getElementById('title'),
  description: document.getElementById('description'),
  dueDate: document.getElementById('due-date'),
  priority: document.getElementById('priority'),
};

taskList.push(...loadTasks());

loadPage('dashboard');
renderTasks();

el.navTab.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  loadPage(button.dataset.value);
});

el.openDialog.addEventListener('click', () => {
  el.dialog.showModal();
});

el.createTaskBtn.addEventListener('click', () => {
  addTaskToList(
    formEl.title.value,
    formEl.description.value,
    formEl.dueDate.value,
    formEl.priority.value,
  );
  renderTasks();

  formEl.form.reset();
  el.dialog.close();
});

console.log(taskList);
