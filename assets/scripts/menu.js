// ==================== МОБИЛЬНОЕ МЕНЮ ====================

// Основные элементы меню
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Создаём оверлей (полупрозрачный фон)
const navOverlay = document.createElement("div");
navOverlay.className = "nav-overlay";
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    
    // Переключаем визуальные состояния
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("open");
    navOverlay.classList.toggle("active");
    
    // Блокируем скролл страницы при открытом меню
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    
    // Перемещаем фокус для доступности
    if (!isExpanded) {
        // Меню открылось - фокус на первом пункте меню
        const firstLink = mobileMenu.querySelector(".mobile-menu__link");
        if (firstLink) firstLink.focus();
    } else {
        // Меню закрылось - возвращаем фокус на кнопку
        menuToggle.focus();
    }
}

// Обработчики событий для меню
menuToggle.addEventListener("click", toggleMenu);
navOverlay.addEventListener("click", toggleMenu);

// Закрытие меню при клике на ссылку
document.querySelectorAll(".mobile-menu__link").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню по клавише Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        toggleMenu();
    }
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains("open")) {
        toggleMenu();
    }
});

// ==================== КНОПКА "НАВЕРХ" ====================

// Показываем/скрываем кнопку при скролле
window.addEventListener("scroll", () => {
    const scrollTopButton = document.getElementById("scrollTop");
    if (scrollTopButton) {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }
    }
});

// Плавная прокрутка к началу страницы
document.getElementById("scrollTop")?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
    // Для доступности - возвращаем фокус на логичное место
    document.querySelector(".header")?.focus();
});

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

// Инициализация ARIA-атрибутов при загрузке
document.addEventListener("DOMContentLoaded", () => {
    // Инициализируем кнопку меню если она есть
    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-controls", "mobileMenu");
    }
    
    // Скрываем кнопку "Наверх" по умолчанию
    const scrollTopButton = document.getElementById("scrollTop");
    if (scrollTopButton) {
        scrollTopButton.classList.remove("visible");
    }
});