export default function loadPage(page) {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach((tab) => {
    tab.hidden = true;
  });

  const activeTab = document.getElementById(`${page}-tab`);

  if (activeTab) {
    activeTab.hidden = false;
  }
}
