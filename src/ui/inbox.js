import { taskList } from '../components/task.js';

export default function renderInbox() {
  const taskContainer = document.getElementById('inbox-task-container');

  for (const task of taskList) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const title = document.createElement('h2');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = task.dueDate;

    const priority = document.createElement('p');
    priority.textContent = task.priority;

    taskCard.append(title, description, dueDate, priority);

    taskContainer.append(taskCard);
  }
}
