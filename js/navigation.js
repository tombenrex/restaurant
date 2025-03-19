// js/navigation.js

export function activateNavItem(itemId) {
  const navLinks = document.querySelectorAll(".navigation button");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.getElementById(itemId);
  activeLink.classList.add("active");
}
