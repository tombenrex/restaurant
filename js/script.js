const hamMenu = document.querySelector(".menu-btn");

const offScreenMenu = document.querySelector(".navigation");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document
    .querySelectorAll("header, aside, section")
    .forEach((el) => el.classList.toggle("dark"));
});
