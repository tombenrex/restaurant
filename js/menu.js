import { addToBasket, showBasketDetails, updateBasketButton } from "./cart.js";
import { basketIcon, getAddToBasketIcon } from "./icons.js";
import { setActiveMenuButton } from "./activebtn.js";
import { reapplyDarkMode } from "./darkmode.js";

let menuData = {};

export async function fetchMenu() {
  try {
    const response = await fetch("data/data.json");
    menuData = await response.json();

    displayMenu("starters"); // Default to starters
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

export function displayMenu(category) {
  const menuContainer = document.getElementById("menu-container");
  if (!menuContainer) return;

  menuContainer.innerHTML = "";

  const items = menuData.menu[category] || [];
  if (items.length === 0) {
    menuContainer.innerHTML = "<p>No items available.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <div class="price-buy">
        <span class="price">$${item.price.toFixed(2)}</span>
        ${getAddToBasketIcon(item)} 
      </div>
    `;

    menuItem
      .querySelector("i.fa-square-plus")
      .addEventListener("click", () =>
        addToBasket(item.id, item.name, item.price)
      );

    fragment.appendChild(menuItem);
  });

  menuContainer.appendChild(fragment);
  reapplyDarkMode(); // Ensure dark mode is applied after updating the menu
}

export function filterMenu(category) {
  if (!menuData.menu[category]) return;
  displayMenu(category);
  setActiveMenuButton(category);
}

export function showMenu() {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  mainContent.innerHTML = `
    <section id="menu-section" class="menu-section">
      <header class="menu-header">
        <nav class="filters">
          ${["starters", "main-courses", "desserts"]
            .map(
              (category) =>
                `<a href="#${category}-link" id="${category}-link" class="filter">${category
                  .replace("-", " ")
                  .toUpperCase()}</a>`
            )
            .join("")}
        </nav>
      </header>
      <aside class="aside-menu">
        <button id="basket-button">${basketIcon}</button>
      </aside>
      <div id="menu-container" class="menu-container"></div>
    </section>
  `;

  // Attach event listeners dynamically
  ["starters", "main-courses", "desserts"].forEach((category) => {
    document
      .getElementById(`${category}-link`)
      ?.addEventListener("click", () => filterMenu(category));
  });

  document
    .getElementById("basket-button")
    ?.addEventListener("click", showBasketDetails);

  fetchMenu();
  reapplyDarkMode(); // Ensure dark mode applies after rendering the menu
  updateBasketButton(); // **Ensure basket count is updated**
}
