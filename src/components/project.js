import { saveProjects } from '../../storage/storage.js';
import { taskList, renderTasks } from './task.js';

const projectList = [];

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

function addProjectsToList(name) {
  const project = new Project(name);

  projectList.push(project);
  saveProjects(projectList);

  return project;
}

function renderProjectSidebar() {
  const projectContainer = document.getElementById('project-container');

  projectContainer.textContent = '';

  for (const project of projectList) {
    const navButton = document.createElement('button');

    navButton.classList.add('nav-button');
    navButton.dataset.value = project.id;
    navButton.textContent =
      project.name.trim().charAt(0).toUpperCase() + project.name.slice(1);

    projectContainer.appendChild(navButton);
  }
}

function createProjectTab(content, project) {
  const projectTab = document.createElement('section');
  projectTab.classList.add('tab');
  projectTab.id = `${project.id}-tab`;
  projectTab.hidden = true;

  const pageHeader = document.createElement('div');
  pageHeader.classList.add('page-header');

  const header = document.createElement('h1');
  header.textContent =
    project.name.charAt(0).toUpperCase() + project.name.slice(1);

  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('add-task-btn');
  addTaskBtn.textContent = '+ Add Task';
  addTaskBtn.dataset.projectId = project.id;

  pageHeader.append(header, addTaskBtn);

  const taskContainer = document.createElement('div');
  taskContainer.id = `${project.id}-task-container`;

  projectTab.append(pageHeader, taskContainer);
  content.appendChild(projectTab);
}

function renderProjectTasks(project) {
  const taskContainer = document.getElementById(`${project.id}-task-container`);

  if (!taskContainer) return;

  const projectTasks = taskList.filter((task) => task.projectId === project.id);

  renderTasks(taskContainer, projectTasks, () => renderProjectTasks(project));
}

export {
  projectList,
  Project,
  addProjectsToList,
  renderProjectSidebar,
  createProjectTab,
  renderProjectTasks,
};
