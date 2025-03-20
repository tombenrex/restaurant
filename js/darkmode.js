// js/darkmode.js
import { moonIcon, sunIcon } from "./icons.js";
let isDarkMode = false;

export function createDarkModeToggle() {
  const darkModeContainer = document.createElement("div");
  darkModeContainer.classList.add("dark-mode");

  darkModeContainer.innerHTML = `
    <input type="checkbox" class="checkbox" id="checkbox" />
    <label for="checkbox" class="checkbox-label">
      ${moonIcon}
      ${sunIcon}
      <span class="ball"></span>
    </label>
  `;

  const darkModeDiv = document.getElementById("dark-mode");
  if (darkModeDiv) {
    darkModeDiv.appendChild(darkModeContainer);
  } else {
    console.error("Element with ID 'dark-mode' not found.");
    return;
  }

  const darkElements = document.querySelectorAll(
    ".header, .menu-section, .wrapper, .nav-btn, .fa-solid, main, .filter, .filters a, .popup-content, .navigation.active, .span, .menu-item"
  );
  const checkbox = document.getElementById("checkbox");
  const logo = document.querySelector(".logo");

  if (checkbox) {
    checkbox.addEventListener("change", () => {
      isDarkMode = checkbox.checked;
      darkElements.forEach((element) => {
        if (isDarkMode) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      });

      if (logo) {
        logo.src = isDarkMode ? "img/logo-dark.png" : "img/logo-light.png";
      }

      reapplyDarkMode();
    });
  } else {
    console.error("Checkbox not found.");
  }
}

export function reapplyDarkMode() {
  const darkElements = document.querySelectorAll(
    ".header, .menu-section, .wrapper, .nav-btn, .fa-solid, main, .filter, .filters a, .popup-content, .navigation.active, .span, .menu-item"
  );
  darkElements.forEach((element) => {
    if (isDarkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  });
}
