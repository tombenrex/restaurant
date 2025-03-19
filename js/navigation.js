export function activateNavItem(itemId) {
  const navLinks = document.querySelectorAll(".navigation button");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.getElementById(itemId);
  activeLink.classList.add("active");
}

// Function to set active button
export function setActiveMenuButton(category) {
  const filterButtons = document.querySelectorAll(".filters a");
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    `.filters a[href="#${category}-link"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}
