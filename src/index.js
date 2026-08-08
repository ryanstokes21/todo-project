import './css/main.css';
import loadPage from './router/tabs.js';
import { loadProjects, loadTasks } from '../storage/storage.js';
import {
  Task,
  addTaskToList,
  renderTasks,
  taskList,
  refreshTasks,
} from './components/task.js';
import {
  addProjectsToList,
  createProjectTab,
  Project,
  projectList,
  renderProjectSidebar,
} from './components/project.js';

const el = {
  content: document.getElementById('content'),
  navTab: document.getElementById('nav-tab'),
  navTabProjects: document.getElementById('nav-projects-tab'),
  openDialog: document.getElementById('open-task-dialog'),
  addProjectBtn: document.getElementById('add-project-btn'),
  taskDialog: document.getElementById('task-dialog'),
  projectDialog: document.getElementById('project-dialog'),
  completeBtn: document.querySelector('.complete-btn'),
  deleteBtn: document.querySelector('.delete-btn'),
};

const taskFormEl = {
  taskForm: document.getElementById('task-form'),
  createTaskBtn: document.getElementById('create-task-btn'),
  closeTaskDialog: document.getElementById('close-task-btn'),
  title: document.getElementById('title'),
  description: document.getElementById('description'),
  dueDate: document.getElementById('due-date'),
  priority: document.getElementById('priority'),
};

const projectFormEl = {
  projectForm: document.getElementById('project-form'),
  projectName: document.getElementById('project-name'),
  createProjectBtn: document.getElementById('create-project-btn'),
  closeProjectBtn: document.getElementById('close-project-btn'),
};

const savedTasks = loadTasks();

savedTasks.forEach((savedTask) => {
  const task = Object.assign(
    new Task(
      savedTask.title,
      savedTask.description,
      savedTask.dueDate,
      savedTask.priority,
    ),
    savedTask,
  );
  taskList.push(task);
});

const savedProjects = loadProjects();

savedProjects.forEach((savedProject) => {
  const project = Object.assign(new Project(savedProject.name));
  projectList.push(project);
});

loadPage('dashboard');
refreshTasks();
renderProjectSidebar();

el.navTab.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  loadPage(button.dataset.value);
});

el.navTabProjects.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  loadPage(button.dataset.value);
});

el.openDialog.addEventListener('click', () => {
  el.taskDialog.showModal();
});

taskFormEl.createTaskBtn.addEventListener('click', () => {
  addTaskToList(
    taskFormEl.title.value,
    taskFormEl.description.value,
    taskFormEl.dueDate.value,
    taskFormEl.priority.value,
  );
  refreshTasks();

  taskFormEl.taskForm.reset();
  el.dialog.close();
});

taskFormEl.closeTaskDialog.addEventListener('click', () => {
  taskFormEl.taskForm.reset();
  el.taskDialog.close();
});

el.addProjectBtn.addEventListener('click', () => {
  el.projectDialog.showModal();
});

projectFormEl.createProjectBtn.addEventListener('click', () => {
  addProjectsToList(projectFormEl.projectName.value);
  el.projectDialog.close();
  renderProjectSidebar();
  createProjectTab(el.content);
});

projectFormEl.closeProjectBtn.addEventListener('click', () => {
  projectFormEl.projectForm.reset();
  el.projectDialog.close();
});
