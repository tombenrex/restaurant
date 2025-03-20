// js/main.js
import { contactUs } from "./contactUs.js";
import { showMenu } from "./menu.js";
import { ourHistory } from "./history.js";
import { activateNavItem } from "./navigation.js";
import { loadFontAwesome } from "./icons.js";
import { createDarkModeToggle } from "./darkmode.js";
import { setActiveMenuButton } from "./navigation.js";

document.addEventListener("DOMContentLoaded", function () {
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
    showMenu();
    setActiveMenuButton("starters");
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

loadFontAwesome();
createDarkModeToggle();
showMenu();
