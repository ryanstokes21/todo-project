import { renderTasks, taskList } from './task.js';

function isToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysTasks = taskList.filter((task) => {
    const taskDate = new Date(`${task.dueDate}T00:00:00`);

    return taskDate.toDateString() === today.toDateString();
  });

  return todaysTasks;
}

export default function renderToday() {
  const taskContainer = document.getElementById('todays-task-container');

  const todaysTasks = isToday();

  renderTasks(taskContainer, todaysTasks);
}
