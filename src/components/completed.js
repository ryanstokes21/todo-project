import { renderTasks, taskList } from './task.js';

export default function renderCompleted() {
  const taskContainer = document.getElementById('completed-task-container');

  const completed = taskList.filter((task) => task.completed === true);

  if (completed.length === 0) {
    taskContainer.textContent = 'No completed tasks.';
    return;
  }
  renderTasks(taskContainer, completed);

  console.log('complete:', completed);
}
