const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
});