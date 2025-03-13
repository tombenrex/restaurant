let menuData = {}; // Variable to store fetched data

// Fetch JSON file and initialize menu
async function fetchMenu() {
  try {
    const response = await fetch("json/menu.json");
    menuData = await response.json();
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

// Function to filter menu items
function filterMenu(category) {
  if (!menuData.menu) return;

  let filteredItems = [];

  if (category === "starters") {
    filteredItems = menuData.menu.starters;
  } else if (category === "main_courses") {
    filteredItems = menuData.menu.main_courses;
  } else if (category === "desserts") {
    filteredItems = menuData.menu.desserts;
  }

  displayMenu(filteredItems);
}

// Fetch menu on page load
document.addEventListener("DOMContentLoaded", fetchMenu);
