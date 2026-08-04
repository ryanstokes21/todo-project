const STORAGE_KEY = 'taskflow-task';

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
