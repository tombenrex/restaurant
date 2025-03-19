// js/menu.js
import { addToBasket } from "./basket.js"; // Import the function
import { showBasketDetails } from "./basket.js";
let menuData = {};

export async function fetchMenu() {
  try {
    const response = await fetch("data/data.json");
    menuData = await response.json();
    displayMenu(menuData.menu.starters, addToBasket);
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

export function displayMenu(items) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";

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
      <div class="price-buy">
        <span class="price">$${item.price.toFixed(2)}</span>
        <i class="fa-solid fa-square-plus" data-id="${item.id}" data-name="${
      item.name
    }" data-price="${item.price}"></i>
      </div>
    `;

    // Attach the event listener for the "add to basket" button
    const addButton = menuItem.querySelector("i.fa-square-plus");
    addButton.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      const itemName = this.getAttribute("data-name");
      const itemPrice = parseFloat(this.getAttribute("data-price"));
      addToBasket(itemId, itemName, itemPrice);
    });

    menuContainer.appendChild(menuItem);
  });
}

export function filterMenu(category) {
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

export function showMenu() {
  const mainContent = document.getElementById("main-content");

  const menuContent = `
      <section id="menu-section" class="menu-section">
      <header class="menu-header">
        <nav class="filters">
          <a href="#" id="starters-link">Starters</a>
          <a href="#" id="main-courses-link">Main Courses</a>
          <a href="#" id="desserts-link">Desserts</a>
        </nav>
      </header>
      <aside class="aside-menu">
        <button id="basket-button"><i class="fa-solid fa-cart-shopping"></i></button>
      </aside>
      <div id="menu-container" class="menu-container"></div>
    </section>
  `;

  mainContent.innerHTML = menuContent;

  // Attach event listeners to the filter links
  document
    .getElementById("starters-link")
    .addEventListener("click", () => filterMenu("starters"));
  document
    .getElementById("main-courses-link")
    .addEventListener("click", () => filterMenu("main_courses"));
  document
    .getElementById("desserts-link")
    .addEventListener("click", () => filterMenu("desserts"));
  document
    .getElementById("basket-button")
    .addEventListener("click", showBasketDetails);

  fetchMenu(addToBasket);
}
