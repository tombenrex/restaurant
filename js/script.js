const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const darkToggle = document.querySelectorAll("section");

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.querySelector("header").classList.toggle("dark");
  document.querySelector("aside").classList.toggle("dark");
  document.querySelector("body").classList.toggle("dark");

  darkToggle.forEach((element) => {
    element.classList.toggle("dark");
  });

  toggleImage();
});

let isImage1 = true;

function toggleImage() {
  const img = document.querySelector(".logo");

  if (isImage1) {
    img.src = "img/logo-dark.png";
  } else {
    img.src = "img/logo-light.png";
  }

  isImage1 = !isImage1; // Toggle the flag
}
