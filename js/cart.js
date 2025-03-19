// js/cart.js

import { basketIcon, circleIcon } from "./icons.js";

let basket = [];
let totalPrice = 0;

export function addToBasket(itemId, itemName, itemPrice) {
  const existingItem = basket.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }

  totalPrice += itemPrice;

  updateBasketButton();
}

export function updateBasketButton() {
  const basketButton = document.getElementById("basket-button");
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  if (basketButton) {
    basketButton.innerHTML = `
       ${basketIcon} <div class="item-circle"> ${itemCount} </div>
    `;
  }
}

export function showBasketDetails() {
  const existingPopup = document.getElementById("basket-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.id = "basket-popup";
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const clearBasket = document.createElement("button");
  clearBasket.classList.add("clear-button");
  clearBasket.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  clearBasket.onclick = () => {
    basket = [];
    totalPrice = 0;
    updateBasketButton();
    showBasketDetails();
  };

  const checkOutButton = document.createElement("button");
  checkOutButton.classList.add("checkout-btn");
  checkOutButton.innerHTML = "Check out";

  checkOutButton.onclick = () => {
    if (basket.length === 0) {
      alert("You have nothing to checkout");
      document.body.removeChild(popup);
    } else {
      alert("Proceed to checkout...");

      document.body.removeChild(popup);
    }
  };

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = `${circleIcon}`;
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };

  popupContent.appendChild(closeButton);

  const basketDetailsContainer = document.createElement("div");
  basketDetailsContainer.classList.add("basket-details-popup");

  if (basket.length === 0) {
    basketDetailsContainer.innerHTML = "<p>Your basket is empty.</p>";
  } else {
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

  popupContent.appendChild(basketDetailsContainer);

  popupContent.appendChild(clearBasket);
  popupContent.appendChild(checkOutButton);

  popup.appendChild(popupContent);

  document.body.appendChild(popup);
}
