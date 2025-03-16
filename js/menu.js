let menuData = {}; // Variable to store fetched data

// Fetch JSON file and initialize menu
async function fetchMenu() {
  try {
    const response = await fetch("json/menu.json");
    menuData = await response.json();
    // Display all items initially (e.g., starters)
    displayMenu(menuData.menu.starters); // Start by showing starters
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

// Function to display menu items
function displayMenu(items) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; // Clear existing items

  if (items.length === 0) {
    menuContainer.innerHTML = "<p>No items available.</p>";
    return;
  }

  items.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <span class="price">$${item.price.toFixed(2)}</span>
    `;

    menuContainer.appendChild(menuItem);
  });
}

function showMenu() {
  const mainContent = document.getElementById("main-content");

  // Create the menu content HTML structure
  const menuContent = `
    <section id="menu-section" class="menu-section">
      <div class="menu-content">
        <header class="menu-header">
          <div class="filters">
            <a onclick="filterMenu('starters')">Starters</a>
            <a onclick="filterMenu('main_courses')">Main Courses</a>
            <a onclick="filterMenu('desserts')">Desserts</a>
          </div>
        </header>
        <div id="menu-container" class="menu-container"></div>
      </div>
    </section>
  `;

  // Replace main content with menu content
  mainContent.innerHTML = menuContent;

  // Call fetchMenu here to load data and populate the menu
  fetchMenu();

  // Set the default active button to 'Starters' when the menu is shown
  setActiveMenuButton("starters");
}

// Filter menu based on category
function filterMenu(category) {
  let filteredItems = [];

  // Remove active class from all filter buttons
  const filterButtons = document.querySelectorAll(".filters a");
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Add active class to the clicked button
  const activeButton = document.querySelector(
    `.filters a[onclick="filterMenu('${category}')"]`
  );
  activeButton.classList.add("active");

  if (category === "starters") {
    filteredItems = menuData.menu.starters;
  } else if (category === "main_courses") {
    filteredItems = menuData.menu.main_courses;
  } else if (category === "desserts") {
    filteredItems = menuData.menu.desserts;
  }

  displayMenu(filteredItems);
}
function setActiveMenuButton(category) {
  const filterButtons = document.querySelectorAll(".filters a");
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    `.filters a[onclick="filterMenu('${category}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}
