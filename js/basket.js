// js/basket.js

let basket = [];
let totalPrice = 0;

// Function to add an item to the basket
export function addToBasket(itemId, itemName, itemPrice) {
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
export function updateBasketButton() {
  const basketButton = document.getElementById("basket-button");
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  if (basketButton) {
    basketButton.innerHTML = `
      <i class="fa-solid fa-cart-shopping"></i> <div class="item-circle"> ${itemCount} </div>
    `;
  }
}

// Function to show the basket details (items and prices) in a popup
export function showBasketDetails() {
  // Check if popup already exists, if so, return
  const existingPopup = document.getElementById("basket-popup");
  if (existingPopup) {
    existingPopup.remove(); // Remove the existing popup
  }

  // Create the popup structure
  const popup = document.createElement("div");
  popup.id = "basket-popup";
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  // Clear Basket Button
  const clearBasket = document.createElement("button");
  clearBasket.classList.add("clear-button");
  clearBasket.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  clearBasket.onclick = () => {
    // Clear the basket and reset the total price
    basket = [];
    totalPrice = 0;
    updateBasketButton(); // Update the basket button UI
    showBasketDetails(); // Refresh the popup content to show empty basket
  };

  // Checkout Button
  const checkOutButton = document.createElement("button");
  checkOutButton.classList.add("checkout-btn");
  checkOutButton.innerHTML = "Check out";

  checkOutButton.onclick = () => {
    if (basket.length === 0) {
      alert("You have nothing to checkout");
      document.body.removeChild(popup);
    } else {
      alert("Proceed to checkout...");
      // You can later integrate real checkout logic
      document.body.removeChild(popup);
    }
  };

  // Close Button
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
  popupContent.appendChild(checkOutButton);

  // Append the popup content to the popup
  popup.appendChild(popupContent);

  // Append the popup to the body of the document
  document.body.appendChild(popup);
}
