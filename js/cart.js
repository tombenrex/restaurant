// cart.js

import { basketIcon, circleIcon } from "./icons.js";

let basket = JSON.parse(localStorage.getItem("basket")) || [];

export function addToBasket(itemId, itemName, itemPrice) {
  const existingItem = basket.find((item) => item.id === itemId);

  existingItem
    ? existingItem.quantity++
    : basket.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: 1,
      });

  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketButton();
}

export function updateBasketButton() {
  const basketButton = document.getElementById("basket-button");
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  if (basketButton) {
    basketButton.innerHTML = `${basketIcon} <div class="item-circle">${itemCount}</div>`;
  }
}

export function showBasketDetails() {
  document.getElementById("basket-popup")?.remove();

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
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasketButton();
    showBasketDetails();
  };

  const checkOutButton = document.createElement("button");
  checkOutButton.classList.add("checkout-btn");
  checkOutButton.textContent = "Check out";
  checkOutButton.onclick = () => {
    alert(
      basket.length ? "Proceed to checkout..." : "You have nothing to checkout"
    );
    popup.remove();
  };

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = circleIcon;
  closeButton.onclick = () => popup.remove();

  popupContent.append(closeButton);

  const basketDetailsContainer = document.createElement("div");
  basketDetailsContainer.classList.add("basket-details-popup");

  if (!basket.length) {
    basketDetailsContainer.innerHTML = "<p>Your basket is empty.</p>";
  } else {
    basket.forEach((item) => {
      const basketItem = document.createElement("div");
      basketItem.classList.add("basket-item");
      basketItem.innerHTML = `<span>${item.name} (x${
        item.quantity
      })</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
      basketDetailsContainer.append(basketItem);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("basket-total");
    totalDiv.innerHTML = `<strong>Total: $${basket
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)}</strong>`;
    basketDetailsContainer.append(totalDiv);
  }

  popupContent.append(basketDetailsContainer, clearBasket, checkOutButton);
  popup.append(popupContent);
  document.body.append(popup);
}
