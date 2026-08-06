import { renderTasks, taskList } from '../components/task.js';

export default function renderInbox() {
  const taskContainer = document.getElementById('inbox-task-container');

  renderTasks(taskContainer, taskList);
}
