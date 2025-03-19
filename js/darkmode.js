// js/darkmode.js

import { moonIcon, sunIcon } from "./icons.js";

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
  // Get the dark mode div by its ID and append the toggle inside it
  const darkModeDiv = document.getElementById("dark-mode");
  darkModeDiv.appendChild(darkModeContainer);

  // Optional: Add event listener for dark mode toggle functionality
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      document.body.classList.add("dark-mode-active");
    } else {
      document.body.classList.remove("dark-mode-active");
    }
  });
}
