// =====================
// МОБИЛЬНОЕ МЕНЮ - исправленный вариант
// =====================

// Добавляем стили сразу
const mobileCSS = `
    /* Мобильный хедер */
    .mobile-header-wrapper {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background: white;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .mobile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 15px;
        max-width: 100%;
        margin: 0 auto;
        position: relative;
    }
    
    .mobile-header-logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: auto;
    }
    
    /* Кнопка гамбургера - исправленная анимация */
    .mobile-menu-toggle {
        width: 30px;
        height: 30px;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        position: relative;
        z-index: 10001;
    }
    
    .mobile-menu-toggle span {
        display: block;
        width: 100%;
        height: 3px;
        background: #856A65;
        margin: 3px 0;
        transition: all 0.3s ease;
        border-radius: 2px;
        position: relative;
    }
    
    /* Анимация в крестик */
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Мобильное меню */
    .mobile-nav-overlay {
        display: none;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        height: calc(100vh - 70px);
        background: white;
        z-index: 9999;
        padding: 20px;
        overflow-y: auto;
    }
    
    .mobile-nav-overlay.active {
        display: block;
    }
    
    .mobile-nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .mobile-nav-list li {
        margin-bottom: 15px;
        text-align: center;
    }
    
    .mobile-nav-list a {
        display: block;
        padding: 12px;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 600;
        font-size: 18px;
        color: #856A65;
        text-decoration: none;
        border-bottom: 1px solid rgba(133, 106, 101, 0.1);
    }
    
    .mobile-nav-list a:hover {
        color: #CDAA7D;
        background: rgba(205, 170, 125, 0.1);
    }
    
    /* Отключение прокрутки при открытом меню */
    body.mobile-menu-open {
        overflow: hidden;
    }
    
    /* Мобильная адаптация - только для экранов ≤ 768px */
    @media (max-width: 940px) {
        /* Показываем мобильный хедер */
        .mobile-header-wrapper {
            display: block !important;
        }
        
        /* Скрываем оригинальный хедер */
        header {
            display: none !important;
        }
        
        /* Добавляем отступ для контента */
        body {
            padding-top: 70px;
        }
        
        /* Адаптация заглавной надписи "Салон красоты Masty" */
        .bg1 {
            position: absolute !important;
            top: 50px !important; /* Изменено с 20px на 50px, чтобы было ниже */
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            text-align: center !important;
            z-index: 1 !important;
        }
        
        .bg1 h1 {
            font-size: 32px !important; /* Уменьшен размер */
            line-height: 1.2 !important;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5) !important;
            color: #CABEBC !important;
            margin: 0 !important;
            padding: 10px !important;
            background: rgba(133, 106, 101, 0.3) !important; /* Легкий фон для лучшей читаемости */
            border-radius: 5px !important;
        }
        
        .bg1 span {
            font-size: 32px !important; /* Уменьшен размер */
            display: block !important;
            margin-top: 5px !important;
        }
        
        /* Адаптация изображения */
        .main-1 {
            position: relative !important;
        }
        
        .main-1 img {
            height: 350px !important; /* Увеличил высоту для заголовка */
            object-fit: cover !important;
            width: 100% !important;
        }
        
        /* Центрируем кнопку "Запишись Online" */
        .bg2 .container a {
            display: block !important;
            margin: 20px auto 0 !important;
            text-align: center !important;
            width: fit-content !important;
            font-size: 16px !important;
            padding: 10px 25px !important;
        }
        
        /* Адаптация текстового блока */
        .bg2 {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 25px 20px !important;
        }
        
        .bg2 .container {
            padding: 0 !important;
            text-align: center !important;
        }
        
        .bg2 .container p {
            font-size: 16px !important;
            line-height: 1.4 !important;
            margin-bottom: 15px !important;
        }
        
        /* Адаптация галереи */
        .main-4 .container div {
            width: 100% !important;
            margin-right: 0 !important;
            margin-bottom: 15px !important;
        }
        
        .main-4 h1 {
            font-size: 36px !important;
            margin-bottom: 30px !important;
        }
        
        .main-links {
            width: 100% !important;
            margin-left: 0 !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            padding-bottom: 10px !important;
        }
        
        .main-links ul {
            display: flex !important;
            flex-wrap: nowrap !important;
            padding: 0 10px !important;
        }
        
        .main-links li {
            margin-right: 15px !important;
            flex-shrink: 0 !important;
        }
        
        .main-links button {
            font-size: 16px !important;
            padding: 8px 12px !important;
        }
        
        /* Адаптация секции с услугами */
        .main-3 {
            padding: 20px 10px !important;
        }
        
        .main-3 .container {
            width: 100% !important;
            margin-bottom: 20px !important;
            margin-right: 0 !important;
        }
        
        .main-3 .container h1 {
            font-size: 24px !important;
        }
        
        /* Адаптация цитаты */
        .main-2 .quote {
            padding: 30px 20px !important;
            margin: 30px 0 !important;
        }
        
        .main-2 .quote p {
            font-size: 20px !important;
        }
        
        /* Адаптация партнеров */
        .partners .container {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 15px !important;
            padding: 20px !important;
        }
        
        .partners img {
            width: 100px !important;
            height: auto !important;
        }
    }
    
    /* Десктоп */
    @media (min-width: 940px) {
        .mobile-header-wrapper,
        .mobile-nav-overlay {
            display: none !important;
        }
        
        header {
            display: block !important;
        }
        
        body {
            padding-top: 0 !important;
        }
        
        /* Возвращаем оригинальные стили для десктопа */
        .bg1 h1 {
            font-size: 72px !important;
        }
        
        .bg1 span {
            font-size: 72px !important;
        }
    }
    
    /* Активная кнопка фильтрации */
    .main-links button.active {
        color: #856A65 !important;
        text-decoration: underline !important;
        text-decoration-color: #CDAA7D !important;
    }
`;

// Создаем стили
const style = document.createElement("style");
style.textContent = mobileCSS;
document.head.appendChild(style);

// Создаем мобильный хедер и меню
function createMobileMenu() {
  // Проверяем, не создано ли уже
  if (document.querySelector(".mobile-header-wrapper")) return;

  // Создаем контейнер мобильного хедера
  const mobileHeaderWrapper = document.createElement("div");
  mobileHeaderWrapper.className = "mobile-header-wrapper";

  // Создаем сам хедер
  const mobileHeader = document.createElement("div");
  mobileHeader.className = "mobile-header";

  // Создаем логотип
  const logoImg = document.createElement("img");
  logoImg.className = "mobile-header-logo";
  logoImg.src = "img/logo.svg";
  logoImg.alt = "Masty";

  // Создаем кнопку гамбургер-меню
  const menuToggle = document.createElement("button");
  menuToggle.className = "mobile-menu-toggle";
  menuToggle.innerHTML = "<span></span><span></span><span></span>";
  menuToggle.setAttribute("aria-label", "Открыть меню");

  // Собираем хедер
  mobileHeader.appendChild(logoImg);
  mobileHeader.appendChild(menuToggle);
  mobileHeaderWrapper.appendChild(mobileHeader);

  // Создаем мобильное меню
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav-overlay";

  const navList = document.createElement("ul");
  navList.className = "mobile-nav-list";

  // Пункты меню
  const menuItems = [
    { href: "/mastyxx/index.html", text: "Главная" },
    { href: "/mastyxx/masters.html", text: "Мастера" },
    { href: "/mastyxx/price.html", text: "Прайс" },
    { href: "/mastyxx/stock.html", text: "Акции" },
    { href: "/mastyxx/reviews.html", text: "Отзывы" },
    { href: "/mastyxx/contacts.html", text: "Контакты" },
  ];

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    navList.appendChild(li);
  });

  mobileNav.appendChild(navList);

  // Добавляем в body
  document.body.insertBefore(mobileHeaderWrapper, document.body.firstChild);
  document.body.appendChild(mobileNav);

  // Настраиваем обработчики
  setupMobileMenuHandlers();
}

// Настройка обработчиков
function setupMobileMenuHandlers() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav-overlay");

  if (!menuToggle || !mobileNav) return;

  // Переключение меню
  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.classList.toggle("mobile-menu-open");
  });

  // Закрытие меню при клике на ссылку
  mobileNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menuToggle.classList.remove("active");
      this.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    }
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", function (e) {
    if (
      !mobileNav.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      menuToggle.classList.contains("active")
    ) {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    }
  });

  // Закрытие меню на Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuToggle.classList.contains("active")) {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    }
  });
}

// Адаптация для мобильных
function adaptForMobile() {
  const isMobile = window.innerWidth <= 768;

  // Центрируем кнопку "Запишись Online"
  const onlineBtn = document.querySelector(".bg2 .container a");
  if (onlineBtn) {
    if (isMobile) {
      onlineBtn.style.cssText = `
                display: block !important;
                margin: 20px auto 0 !important;
                text-align: center !important;
                width: fit-content !important;
                font-size: 16px !important;
                padding: 10px 25px !important;
            `;
    } else {
      onlineBtn.style.cssText = "";
    }
  }

  // Обновляем заголовок для мобильных
  const bg1 = document.querySelector(".bg1");
  if (bg1 && isMobile) {
    bg1.style.cssText = `
            position: absolute !important;
            top: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            text-align: center !important;
            z-index: 1 !important;
        `;

    const h1 = bg1.querySelector("h1");
    if (h1) {
      h1.style.cssText = `
                font-size: 32px !important;
                line-height: 1.2 !important;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5) !important;
                color: #CABEBC !important;
                margin: 0 !important;
                padding: 10px !important;
                background: rgba(133, 106, 101, 0.3) !important;
                border-radius: 5px !important;
            `;
    }

    const span = bg1.querySelector("span");
    if (span) {
      span.style.cssText = `
                font-size: 32px !important;
                display: block !important;
                margin-top: 5px !important;
            `;
    }
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  // Создаем мобильное меню
  createMobileMenu();

  // Адаптация
  adaptForMobile();

  // Обработчик изменения размера окна
  window.addEventListener("resize", adaptForMobile);
});

// =====================
// ФОРМА ЗАПИСИ
// =====================

function toggleForm() {
  const form = document.querySelector(".form");
  if (form) {
    form.style.display = form.style.display === "block" ? "none" : "block";
  }
}

// Закрытие формы при клике вне ее
document.addEventListener("click", function (event) {
  const form = document.querySelector(".form");
  if (form && form.style.display === "block") {
    if (!form.contains(event.target)) {
      form.style.display = "none";
    }
  }
});

