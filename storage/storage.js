const STORAGE_KEY = 'taskflow-task';
const PROJECTS_STORAGE_KEY = 'taskflow-projects';

export function saveTask(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  return JSON.parse(savedTasks);
}

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
  const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);

  if (!savedProjects) {
    return [];
  }

  return JSON.parse(savedProjects);
}
