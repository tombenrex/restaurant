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

  const darkModeDiv = document.getElementById("dark-mode");
  if (darkModeDiv) {
    darkModeDiv.appendChild(darkModeContainer);
  } else {
    console.error("Element with ID 'dark-mode' not found.");
    return;
  }

  const wrapper = document.querySelector(".wrapper");
  const checkbox = document.getElementById("checkbox");

  if (wrapper && checkbox) {
    checkbox.addEventListener("change", () => {
      wrapper.classList.toggle("dark-mode-active", checkbox.checked);
    });
  } else {
    console.error("Wrapper or checkbox not found.");
  }
}
