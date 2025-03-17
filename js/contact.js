function contactUs() {
  const mainContent = document.getElementById("main-content");

  // Create the menu content HTML structure
  const menuContent = `
        <section id="menu-section" class="menu-section">
          
            <header class="menu-header">
              <div class="filters">
                <p> Here u can contact US</p>
              </div>
            </header>
            <div id="menu-container" class="menu-container"></div>
          
        </section>
      `;

  // Replace main content with menu content
  mainContent.innerHTML = menuContent;
}
