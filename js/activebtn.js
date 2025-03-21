// activebtn.js

export function activateNavItem(itemId) {
  document
    .querySelectorAll(".navigation button")
    .forEach((link) => link.classList.remove("active"));

  document.getElementById(itemId)?.classList.add("active");
}

export function setActiveMenuButton(category) {
  document
    .querySelectorAll(".filters a")
    .forEach((button) => button.classList.remove("active"));

  document
    .querySelector(`.filters a[href="#${category}-link"]`)
    ?.classList.add("active");
}
