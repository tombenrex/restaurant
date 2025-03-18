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
      <i class="fa-solid fa-cart-shopping"></i> <div class="item-circle"> ${itemCount} </div>
    `;
  }
}

// Function to show the basket details (items and prices) in a popup
function showBasketDetails() {
  // Check if popup already exists, if so, return
  if (document.getElementById("basket-popup")) {
    return; // Prevent showing multiple popups
  }

  // Create the popup structure
  const popup = document.createElement("div");
  popup.id = "basket-popup";
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const clearBasket = document.createElement("button");
  clearBasket.classList.add("clear-button");
  clearBasket.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  clearBasket.onclick = () => {
    // Clear the basket and reset the total price
    basket = [];
    totalPrice = 0;
    updateBasketButton(); // Update the basket button UI
    showBasketDetails(); // Refresh the popup content to show empty basket
    basketDetailsContainer.innerHTML = "<p>Your basket is empty.</p>";
  };

  const checkOutButton = document.createElement("button");
  checkOutButton.classList.add("checkout-btn");
  closeButton.innerHTML = "Check out";

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
  closeButton.onclick = () => {
    // Close the popup when clicked
    document.body.removeChild(popup);
  };

  popupContent.appendChild(closeButton);

  const basketDetailsContainer = document.createElement("div");
  basketDetailsContainer.classList.add("basket-details-popup");

  if (basket.length === 0) {
    basketDetailsContainer.innerHTML = "<p>Your basket is empty.</p>";
  } else {
    // Loop through each item in the basket and display it in the popup
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

  // Append basket details to popup content
  popupContent.appendChild(basketDetailsContainer);

  popupContent.appendChild(clearBasket);

  // Append the popup content to the popup
  popup.appendChild(popupContent);

  // Append the popup to the body of the document
  document.body.appendChild(popup);
}

// Function to show the menu
function showMenu() {
  const mainContent = document.getElementById("main-content");

  // Create the menu content HTML structure
  const menuContent = `
    <section id="menu-section" class="menu-section">
      <header class="menu-header">
        <nav class="filters">
          <a onclick="filterMenu('starters')">Starters</a>
          <a onclick="filterMenu('main_courses')">Main Courses</a>
          <a onclick="filterMenu('desserts')">Desserts</a>
           
        </nav>
      </header>
      <aside class="aside-menu">
      <button id="basket-button" onclick="showBasketDetails()"><i class="fa-solid fa-cart-shopping"></i></button>
      </aside>
      <div id="menu-container" class="menu-container"></div>
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
