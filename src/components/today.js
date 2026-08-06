import { renderTasks, taskList } from './task.js';

function getTodaysTasks() {
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

  const todaysTasks = getTodaysTasks();

  renderTasks(taskContainer, todaysTasks);
}
