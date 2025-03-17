const hamMenu = document.querySelector(".menu-btn");
const offScreenMenu = document.querySelector(".navigation");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Close the menu when clicking outside
document.addEventListener("click", (event) => {
  // Check if the click was outside the navigation and hamburger menu
  if (
    !offScreenMenu.contains(event.target) &&
    !hamMenu.contains(event.target)
  ) {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  }
});

// Function to handle the active navigation item
function activateNavItem(itemId) {
  // Remove active class from all navigation items
  const navLinks = document.querySelectorAll(".navigation button");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to the clicked navigation item
  const activeLink = document.getElementById(itemId);
  activeLink.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to navigation links
  document.getElementById("menu-link").addEventListener("click", function () {
    activateNavItem("menu-link");
    showMenu(); // Call showMenu or handle navigation
    hamMenu.classList.remove("active"); // Close the menu when clicking on the link
    offScreenMenu.classList.remove("active"); // Close the menu when clicking on the link
  });

  document
    .getElementById("history-link")
    .addEventListener("click", function () {
      activateNavItem("history-link");
      hamMenu.classList.remove("active"); // Close the menu when clicking on the link
      offScreenMenu.classList.remove("active"); // Close the menu when clicking on the link
      ourHistory();
    });

  document
    .getElementById("contact-link")
    .addEventListener("click", function () {
      activateNavItem("contact-link");
      hamMenu.classList.remove("active"); // Close the menu when clicking on the link
      offScreenMenu.classList.remove("active"); // Close the menu when clicking on the link
      contactUs();
    });
});
