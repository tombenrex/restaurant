// js/main.js
import {
  addToBasket,
  updateBasketButton,
  showBasketDetails,
} from "./basket.js";
import { contactUs } from "./contactUs.js";
import { showMenu } from "./menu.js";
import { ourHistory } from "./history.js";
import { activateNavItem } from "./navigation.js";

document.addEventListener("DOMContentLoaded", function () {
  window.showBasketDetails = showBasketDetails; // This is the key change
  const hamMenu = document.querySelector(".menu-btn");
  const offScreenMenu = document.querySelector(".navigation");

  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (
      !offScreenMenu.contains(event.target) &&
      !hamMenu.contains(event.target)
    ) {
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
    }
  });

  document.getElementById("menu-link").addEventListener("click", function () {
    activateNavItem("menu-link");
    showMenu(addToBasket);
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  });

  document
    .getElementById("history-link")
    .addEventListener("click", function () {
      activateNavItem("history-link");
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
      ourHistory();
    });

  document
    .getElementById("contact-link")
    .addEventListener("click", function () {
      activateNavItem("contact-link");
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
      contactUs();
    });
});
