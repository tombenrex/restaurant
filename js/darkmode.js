const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document
    .querySelectorAll("header, aside, section")
    .forEach((el) => el.classList.toggle("dark"));
});
