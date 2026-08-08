import { renderTasks, taskList } from './task.js';

export default function renderToday() {
  const taskContainer = document.getElementById('todays-task-container');

  const todaysTasks = taskList.filter(
    (task) => !task.completed && task.isToday(),
  );

  renderTasks(taskContainer, todaysTasks);

  if (todaysTasks.length === 0) {
    taskContainer.textContent = 'No task due today!';
  }
}
