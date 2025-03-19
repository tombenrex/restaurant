// js/contactUs.js

export function contactUs() {
  const mainContent = document.getElementById("main-content");

  const menuContent = `
      <section id="menu-section" class="menu-section">
        <header class="menu-header">
          <div class="filters">
            <p>Here you can contact us</p>
          </div>
        </header>
        <div id="menu-container" class="menu-container"></div>
      </section>
    `;

  mainContent.innerHTML = menuContent;
}
