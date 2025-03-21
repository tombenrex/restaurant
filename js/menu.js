import { addToBasket, showBasketDetails, updateBasketButton } from "./cart.js";
import {
  basketIcon,
  forkIcon,
  getAddToBasketIcon,
  circleIcon,
} from "./icons.js";
import { setActiveMenuButton } from "./activebtn.js";
import { reapplyDarkMode } from "./darkmode.js";

let menuData = {};

export async function fetchMenu() {
  try {
    const response = await fetch("data/data.json");
    menuData = await response.json();

    displayMenu("starters");
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
  reapplyDarkMode();
}

function showTodayLunch() {
  const popup = document.createElement("div");
  popup.id = "lunch-popup";
  popup.classList.add("lunch-popup");

  const lunchContent = document.createElement("div");
  lunchContent.classList.add("lunch-content");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = circleIcon;
  closeButton.classList.add("close-button");

  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  lunchContent.appendChild(closeButton);

  const lunchBuffet = menuData.lunchBuffet;

  const title = document.createElement("h2");
  title.textContent = "Today's Lunch Buffet";
  lunchContent.appendChild(title);

  const servingTimes = lunchBuffet.servingTimes.monday_to_friday;
  const servingHours = `${servingTimes.lunchStart} - ${servingTimes.lunchEnd}`;

  const lunchInfo = document.createElement("div");
  lunchInfo.innerHTML = `
    <p>${lunchBuffet.description}</p>
    <p><strong>Hours:</strong> ${servingHours}</p>
    <p><strong>Price:</strong> ${lunchBuffet.priceList.adult.standard}</p>
  `;
  lunchContent.appendChild(lunchInfo);

  const specialOffer = document.createElement("p");
  specialOffer.classList.add("special-offer");
  specialOffer.innerHTML = `<strong>Today's Special:</strong> ${lunchBuffet.specialOffers.today.offer} - <strong>Price:</strong> ${lunchBuffet.specialOffers.today.price}`;
  lunchContent.appendChild(specialOffer);

  const priceList = document.createElement("div");
  priceList.innerHTML = `
    <h3>Price List:</h3>
    <p><strong>Adult:</strong> ${lunchBuffet.priceList.adult.standard}</p>
    <p><strong>Child:</strong> ${lunchBuffet.priceList.adult.child}</p>
    <p><strong>Drink Included:</strong> ${lunchBuffet.priceList.adult.drinkIncluded}</p>
  `;
  lunchContent.appendChild(priceList);

  const extras = document.createElement("div");
  extras.innerHTML = `
    <h3>Extras:</h3>
    <p><strong>Extra Bread:</strong> ${lunchBuffet.priceList.extras.extraBread}</p>
    <p><strong>Extra Dessert:</strong> ${lunchBuffet.priceList.extras.extraDessert}</p>
    <p><strong>Coffee:</strong> ${lunchBuffet.priceList.extras.coffee}</p>
    <p><strong>Soft Drink:</strong> ${lunchBuffet.priceList.extras.softDrink}</p>
  `;
  lunchContent.appendChild(extras);

  const beverages = document.createElement("div");
  beverages.innerHTML = `
    <h3>Beverages:</h3>
    <p><strong>Included:</strong> ${lunchBuffet.beverages.included.join(
      ", "
    )}</p>
    <p><strong>Optional:</strong> ${lunchBuffet.beverages.optional.join(
      ", "
    )}</p>
  `;
  lunchContent.appendChild(beverages);

  popup.appendChild(lunchContent);

  document.body.appendChild(popup);
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
        <button id="daily-button">${forkIcon}Today's Lunch</button>
      </aside>
      <div id="menu-container" class="menu-container"></div>
    </section>
  `;

  ["starters", "main-courses", "desserts"].forEach((category) => {
    document
      .getElementById(`${category}-link`)
      ?.addEventListener("click", () => filterMenu(category));
  });

  document
    .getElementById("basket-button")
    ?.addEventListener("click", showBasketDetails);

  document
    .getElementById("daily-button")
    ?.addEventListener("click", showTodayLunch);

  fetchMenu();
  reapplyDarkMode();
  updateBasketButton();
}
