import { basketIcon, circleIcon } from "./icons.js";

let basket = JSON.parse(localStorage.getItem("basket")) || [];
let totalPrice = basket.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

export function addToBasket(itemId, itemName, itemPrice) {
  const existingItem = basket.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }

  totalPrice += itemPrice;
  saveBasket();
  updateBasketButton();
}

export function updateBasketButton() {
  const basketButton = document.getElementById("basket-button");
  if (!basketButton) return;

  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);
  basketButton.innerHTML = `${basketIcon} <div class="item-circle">${itemCount}</div>`;
}

export function showBasketDetails() {
  removeExistingPopup();

  const popup = document.createElement("div");
  popup.id = "basket-popup";
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const closeButton = createButton("close-button", circleIcon, () =>
    document.body.removeChild(popup)
  );
  const clearBasketButton = createButton(
    "clear-button",
    '<i class="fa-solid fa-trash"></i>',
    clearBasket
  );
  const checkOutButton = createButton(
    "checkout-btn",
    "Check out",
    handleCheckout
  );

  popupContent.appendChild(closeButton);
  popupContent.appendChild(renderBasketItems());
  popupContent.appendChild(clearBasketButton);
  popupContent.appendChild(checkOutButton);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}

function renderBasketItems() {
  const container = document.createElement("div");
  container.classList.add("basket-details-popup");

  if (basket.length === 0) {
    container.innerHTML = "<p>Your basket is empty.</p>";
  } else {
    container.innerHTML = basket
      .map(
        (item) => `
        <div class="basket-item">
          <span>${item.name} (x${item.quantity})</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `
      )
      .join("");

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("basket-total");
    totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    container.appendChild(totalDiv);
  }

  return container;
}

function createButton(className, innerHTML, onClick) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerHTML = innerHTML;
  button.onclick = onClick;
  return button;
}

function clearBasket() {
  basket = [];
  totalPrice = 0;
  saveBasket();
  updateBasketButton();
  showBasketDetails();
}

function handleCheckout() {
  if (basket.length === 0) {
    alert("You have nothing to checkout");
  } else {
    alert("Proceed to checkout...");
  }
  removeExistingPopup();
}

function removeExistingPopup() {
  const existingPopup = document.getElementById("basket-popup");
  if (existingPopup) existingPopup.remove();
}

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}
