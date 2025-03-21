// main.js

import { createDarkModeToggle, reapplyDarkMode } from "./darkmode.js";
import { loadFontAwesome } from "./icons.js";
import { showMenu } from "./menu.js";
import { ourHistory } from "./history.js";
import { contactUs } from "./contactus.js";
import { activateNavItem, setActiveMenuButton } from "./activebtn.js";
import { updateBasketButton } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  updateBasketButton();

  const hamMenu = document.querySelector(".menu-btn");
  const offScreenMenu = document.querySelector(".navigation");

  function closeMenu() {
    hamMenu?.classList.remove("active");
    offScreenMenu?.classList.remove("active");
  }

  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (
        !offScreenMenu.contains(event.target) &&
        !hamMenu.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  const pageLinks = {
    "menu-link": () => {
      activateNavItem("menu-link");
      showMenu();
      setActiveMenuButton("starters");
    },
    "history-link": () => {
      activateNavItem("history-link");
      ourHistory();
    },
    "contact-link": () => {
      activateNavItem("contact-link");
      contactUs();
    },
  };

  Object.entries(pageLinks).forEach(([id, handler]) => {
    document.getElementById(id)?.addEventListener("click", () => {
      handler();
      closeMenu();
    });
  });

  loadFontAwesome();
  createDarkModeToggle();
  reapplyDarkMode();

  if (!window.location.hash || window.location.hash === "#history") {
    activateNavItem("history-link");
    ourHistory();
  }
});
