// js/darkmode.js
import { moonIcon, sunIcon } from "./icons.js";

let isDarkMode = localStorage.getItem("darkMode") === "enabled";

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

  const checkbox = document.getElementById("checkbox");
  if (!checkbox) {
    console.error("Checkbox not found.");
    return;
  }

  checkbox.checked = isDarkMode;
  reapplyDarkMode();

  checkbox.addEventListener("change", () => {
    isDarkMode = checkbox.checked;
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    reapplyDarkMode();
  });
}

export function reapplyDarkMode() {
  const darkElements = document.querySelectorAll(
    ".header, footer, .menu-section, .wrapper, .nav-btn, .fa-solid, main, .filter, .filters a, .popup-content, .navigation.active, .span, .menu-item, .checkbox-label, .ball, #daily-button"
  );

  darkElements.forEach((element) => {
    element.classList.toggle("dark", isDarkMode);
  });

  const logo = document.querySelector(".logo");
  if (logo) {
    logo.src = isDarkMode ? "img/logo-dark.png" : "img/logo-light.png";
  }
}
