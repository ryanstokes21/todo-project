const tabs = document.querySelectorAll('.tab');
export default function loadPage(page) {
  tabs.forEach((tab) => {
    tab.hidden = true;
  });

  const activeTab = document.getElementById(`${page}-tab`);

  if (activeTab) {
    activeTab.hidden = false;
  }
}
