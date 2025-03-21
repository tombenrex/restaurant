// js/icons.js

export function loadFontAwesome() {
  const script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/70f7a209bd.js";
  script.crossOrigin = "anonymous"; // Ensure it loads properly
  document.head.appendChild(script);
}

export function getAddToBasketIcon(item) {
  return `<i class="fa-solid fa-square-plus" 
               data-id="${item.id}" 
               data-name="${item.name}" 
               data-price="${item.price}">
            </i>`;
}

export const moonIcon = `<i class="fas fa-moon"></i>`;
export const sunIcon = `<i class="fas fa-sun"></i>`;
export const basketIcon = `<i class="fa-solid fa-basket-shopping"></i>`;
export const circleIcon = `<i class="fa-solid fa-circle-xmark"></i>`;
export const forkIcon = `<i class="fa-solid fa-utensils"></i>`;
