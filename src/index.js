import './css/main.css';
import loadPage from './router/tabs.js';

const el = {
  navTab: document.getElementById('nav-tab'),
};

loadPage('dashboard');

el.navTab.addEventListener('click', (e) => {
  const button = e.target.closest('.nav-button');

  if (!button) return;

  loadPage(button.dataset.value);
});
