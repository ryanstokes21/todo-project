import './css/main.css';
import loadPage from './router/tabs.js';
import { loadProjects, loadTasks } from '../storage/storage.js';
import {
  Task,
  addTaskToList,
  taskList,
  refreshTasks,
} from './components/task.js';
import {
  addProjectsToList,
  createProjectTab,
  Project,
  projectList,
  renderProjectSidebar,
  renderProjectTasks,
} from './components/project.js';

const el = {
  content: document.getElementById('content'),
  navTab: document.getElementById('nav-tab'),
  navTabProjects: document.getElementById('nav-projects-tab'),
  openDialog: document.querySelectorAll('.open-task-dialog'),
  addProjectBtn: document.getElementById('add-project-btn'),
  taskDialog: document.getElementById('task-dialog'),
  projectDialog: document.getElementById('project-dialog'),
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

let activeProjectId = null;

const savedTasks = loadTasks();

savedTasks.forEach((savedTask) => {
  const task = Object.assign(
    new Task(
      savedTask.title,
      savedTask.description,
      savedTask.dueDate,
      savedTask.priority,
      savedTask.projectId ?? null,
    ),
    savedTask,
  );

  taskList.push(task);
});

const savedProjects = loadProjects();

savedProjects.forEach((savedProject) => {
  const project = Object.assign(new Project(savedProject.name), savedProject);
  projectList.push(project);
});

loadPage('dashboard');
refreshTasks();
renderProjectSidebar();

projectList.forEach((project) => {
  createProjectTab(el.content, project);
});

el.navTab.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  activeProjectId = null;
  loadPage(button.dataset.value);
});

el.navTabProjects.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  const project = projectList.find((item) => item.id === button.dataset.value);

  if (!project) return;

  activeProjectId = project.id;
  loadPage(project.id);
  renderProjectTasks(project);
});

el.content.addEventListener('click', (e) => {
  const button = e.target.closest('.add-task-btn');

  if (!button) return;

  activeProjectId = button.dataset.projectId ?? null;
  el.taskDialog.showModal();
});

el.openDialog.forEach((button) => {
  button.addEventListener('click', () => {
    activeProjectId = null;
    el.taskDialog.showModal();
  });
});

taskFormEl.createTaskBtn.addEventListener('click', () => {
  addTaskToList(
    taskFormEl.title.value,
    taskFormEl.description.value,
    taskFormEl.dueDate.value,
    taskFormEl.priority.value,
    activeProjectId,
  );

  refreshTasks();

  if (activeProjectId) {
    const project = projectList.find((item) => item.id === activeProjectId);

    if (project) {
      renderProjectTasks(project);
    }
  }

  taskFormEl.taskForm.reset();
  el.taskDialog.close();
  activeProjectId = null;
});

taskFormEl.closeTaskDialog.addEventListener('click', () => {
  taskFormEl.taskForm.reset();
  el.taskDialog.close();
  activeProjectId = null;
});

el.addProjectBtn.addEventListener('click', () => {
  el.projectDialog.showModal();
});

projectFormEl.createProjectBtn.addEventListener('click', () => {
  const project = addProjectsToList(projectFormEl.projectName.value);

  projectFormEl.projectForm.reset();
  el.projectDialog.close();

  renderProjectSidebar();
  createProjectTab(el.content, project);
});

projectFormEl.closeProjectBtn.addEventListener('click', () => {
  projectFormEl.projectForm.reset();
  el.projectDialog.close();
});
