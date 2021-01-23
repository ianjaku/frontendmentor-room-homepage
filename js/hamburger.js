const hamburgerEl = document.querySelector(".hamburger");
const headerEl = document.querySelector(".header");

const hamburgerActive = "hamburger--active";
const headerActive = "header--active";


hamburgerEl.addEventListener("click", () => {
  headerEl.classList.toggle(headerActive);
  hamburgerEl.classList.toggle(
    hamburgerActive,
    headerEl.classList.contains(headerActive)
  );
});