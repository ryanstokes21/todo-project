import { renderTasks, taskList } from '../components/task.js';

export default function renderToday() {
  const taskContainer = document.getElementById('todays-task-container');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysTasks = taskList.filter((task) => {
    const taskDate = new Date(`${task.dueDate}T00:00:00`);

    return taskDate.toDateString() === today.toDateString();
  });

  renderTasks(taskContainer, todaysTasks);
}
