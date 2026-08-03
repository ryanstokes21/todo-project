import './css/main.css';
import loadPage from './router/tabs.js';

const el = {
  navTab: document.getElementById('nav-tab'),
  openDialog: document.getElementById('open-task-dialog'),
  dialog: document.getElementById('task-dialog'),
  createTaskBtn: document.getElementById('create-task-btn'),
};

loadPage('dashboard');

el.navTab.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  loadPage(button.dataset.value);
});

el.openDialog.addEventListener('click', () => {
  el.dialog.showModal();
});
