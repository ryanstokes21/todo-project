import { saveProjects } from '../../storage/storage.js';

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
}

function renderProjectSidebar() {
  const projectContainer = document.getElementById('project-container');

  projectContainer.textContent = '';

  for (const project of projectList) {
    const navButton = document.createElement('button');
    navButton.classList.add('nav-button');
    navButton.dataset.value = project.name
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-');
    navButton.textContent =
      project.name.trim().charAt(0).toUpperCase() + project.name.slice(1);

    projectContainer.appendChild(navButton);
  }
}

function createProjectTab(content) {
  projectList.forEach((project) => {
    const projectTab = document.createElement('section');
    projectTab.classList.add('.tab');
    projectTab.id = `${project.name.toLowerCase().replaceAll(' ', '-')}-tab`;
    const taskContainer = document.createElement('div');
    taskContainer.id = 'project-task-container';

    projectTab.appendChild(taskContainer);
    content.appendChild(projectTab);
  });
}

function renderProjectTab() {
  const taskContainer = document.getElementById('project-task-container');
  taskContainer.textContent = '';

  for (const project of projectList) {
    const header = document.createElement('h2');
    header.textContent =
      project.name.charAt(0).toUpperCase() + project.name.slice(1);

    taskContainer.append(header);
  }
}

export {
  projectList,
  Project,
  addProjectsToList,
  renderProjectSidebar,
  createProjectTab,
};
