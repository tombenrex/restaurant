let menuData = {}; // Variable to store fetched data
let basket = []; // Array to store items added to the basket
let totalPrice = 0; // Variable to store the total price of items in the basket

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
      <div class="price-buy">
        <span class="price">$${item.price.toFixed(2)}</span>
        <i class="fa-solid fa-square-plus" onclick="addToBasket(${item.id}, '${
      item.name
    }', ${item.price})"></i>
      </div>
    `;

    menuContainer.appendChild(menuItem);
  });
}

// Function to add an item to the basket
function addToBasket(itemId, itemName, itemPrice) {
  // Check if the item is already in the basket
  const existingItem = basket.find((item) => item.id === itemId);

  if (existingItem) {
    // If the item exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If the item doesn't exist, add it to the basket
    basket.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }

  // Update total price
  totalPrice += itemPrice;

  // Update the basket button to show the number of items
  updateBasketButton();
}

// Function to update the basket button with the number of items in the basket
function updateBasketButton() {
  const basketButton = document.getElementById("basket-button");
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  if (basketButton) {
    basketButton.innerHTML = `
      <i class="fa-solid fa-cart-shopping"></i>  ${itemCount} 
    `;
  }
}

// Function to show the basket details (items and prices) when clicked
function showBasketDetails() {
  const basketDetailsContainer = document.getElementById("basket-details");
  basketDetailsContainer.innerHTML = ""; // Clear previous details

  if (basket.length === 0) {
    basketDetailsContainer.innerHTML = "<p>Your basket is empty.</p>";
  } else {
    // Loop through each item in the basket and display it
    basket.forEach((item) => {
      const basketItem = document.createElement("div");
      basketItem.classList.add("basket-item");
      basketItem.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      basketDetailsContainer.appendChild(basketItem);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("basket-total");
    totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    basketDetailsContainer.appendChild(totalDiv);
  }
}

// Function to show the menu
function showMenu() {
  const mainContent = document.getElementById("main-content");

  // Create the menu content HTML structure
  const menuContent = `
    <section id="menu-section" class="menu-section">
      <header class="menu-header">
        <div class="filters">
          <a onclick="filterMenu('starters')">Starters</a>
          <a onclick="filterMenu('main_courses')">Main Courses</a>
          <a onclick="filterMenu('desserts')">Desserts</a>
          <button id="basket-button" onclick="showBasketDetails()"><i class="fa-solid fa-cart-shopping"></i></button> 
        </div>
      </header>
      <div id="menu-container" class="menu-container"></div>
    </section>
    <section id="basket-section" class="basket-section">
      <div id="basket-details" class="basket-details"></div>
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

// Function to set active button
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
