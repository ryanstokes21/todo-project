import { renderTasks, taskList } from './task.js';

export default function renderInbox() {
  const taskContainer = document.getElementById('inbox-task-container');

  renderTasks(taskContainer, taskList);
}
