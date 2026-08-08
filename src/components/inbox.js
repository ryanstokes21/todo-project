import { renderTasks, taskList } from './task.js';

export default function renderInbox() {
  const taskContainer = document.getElementById('inbox-task-container');

  const inboxTasks = taskList.filter((task) => !task.completed);

  renderTasks(taskContainer, inboxTasks);
}
