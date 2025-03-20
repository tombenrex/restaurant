import { createDarkModeToggle, reapplyDarkMode } from "./darkmode.js";
import { loadFontAwesome } from "./icons.js";
import { showMenu } from "./menu.js";
import { ourHistory } from "./history.js";
import { contactUs } from "./contactUs.js";
import { activateNavItem, setActiveMenuButton } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  const hamMenu = document.querySelector(".menu-btn");
  const offScreenMenu = document.querySelector(".navigation");

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

  function closeMenu() {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
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
    const link = document.getElementById(id);
    if (link) {
      link.addEventListener("click", () => {
        handler();
        closeMenu();
      });
    }
  });

  loadFontAwesome();
  createDarkModeToggle();
  reapplyDarkMode();
  showMenu();
});
