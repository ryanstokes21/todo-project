import { renderTasks, taskList } from './task.js';

export default function renderUpcomingTasks() {
  const taskContainer = document.getElementById('upcoming-task-container');

  const upcomingTask = taskList.filter((task) => task.isUpcoming());

  renderTasks(taskContainer, upcomingTask);

  if (upcomingTask.length === 0) {
    taskContainer.textContent = 'No upcoming task yet!';
  }
}
