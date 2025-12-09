// =====================
// МОБИЛЬНОЕ МЕНЮ для страницы контактов (как в script-3.js)
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
    @media (max-width: 768px) {
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
        
        /* Адаптация заглавной надписи "Контакты" */
        .heading {
            position: relative !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            text-align: center !important;
            z-index: 1 !important;
            margin-bottom: 40px !important;
        }
        
        .heading h1 {
            font-size: 36px !important;
            line-height: 1.2 !important;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5) !important;
            color: #856A65 !important;
            margin: 0 !important;
            padding: 10px !important;
        }
        
        /* Адаптация карты */
        .map {
            width: 100% !important;
            padding: 0 15px !important;
            margin-bottom: 40px !important;
        }
        
        .map iframe {
            height: 350px !important;
            width: 100% !important;
        }
        
        /* Адаптация футера */
        .footer__items {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 30px 15px !important;
            width: 100% !important;
        }
        
        .footer__img img {
            margin: 0 auto 20px !important;
        }
        
        .footer__contacts,
        .working__time,
        .social {
            margin: 15px 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
        
        .footer__contacts h2,
        .working__time h2,
        .social h2 {
            font-size: 18px !important;
        }
        
        .footer__contacts ul,
        .working__time ul {
            font-size: 16px !important;
        }
        
        .social img {
            width: 40px !important;
            height: 40px !important;
        }
        
        .end {
            width: 100% !important;
            height: auto !important;
            padding: 15px !important;
        }
        
        .end h1 {
            font-size: 14px !important;
            padding-top: 0 !important;
        }
    }
    
    /* Десктоп */
    @media (min-width: 769px) {
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
    }
`;

// Создаем стили
const style = document.createElement('style');
style.textContent = mobileCSS;
document.head.appendChild(style);

// Создаем мобильный хедер и меню
function createMobileMenu() {
    // Проверяем, не создано ли уже
    if (document.querySelector('.mobile-header-wrapper')) return;
    
    // Создаем контейнер мобильного хедера
    const mobileHeaderWrapper = document.createElement('div');
    mobileHeaderWrapper.className = 'mobile-header-wrapper';
    
    // Создаем сам хедер
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    
    // Создаем логотип
    const logoImg = document.createElement('img');
    logoImg.className = 'mobile-header-logo';
    logoImg.src = 'logo.svg';
    logoImg.alt = 'Masty';
    
    // Создаем кнопку гамбургер-меню
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Открыть меню');
    
    // Собираем хедер
    mobileHeader.appendChild(logoImg);
    mobileHeader.appendChild(menuToggle);
    mobileHeaderWrapper.appendChild(mobileHeader);
    
    // Создаем мобильное меню
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav-overlay';
    
    const navList = document.createElement('ul');
    navList.className = 'mobile-nav-list';
    
    // Пункты меню
    const menuItems = [
        {href: '/mastyxx/index.html', text: 'Главная'},
        {href: '/mastyxx/Masters/masters.html', text: 'Мастера'},
        {href: '/mastyxx/price/price.html', text: 'Прайс'},
        {href: '/mastyxx/stock/stock.html', text: 'Акции'},
        {href: '/mastyxx/reviews1/reviews.html', text: 'Отзывы'},
        {href: '/mastyxx/contacts/contacts.html', text: 'Контакты'}
    ];
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
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
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    
    if (!menuToggle || !mobileNav) return;
    
    // Переключение меню
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // Закрытие меню при клике на ссылку
    mobileNav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            menuToggle.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            menuToggle.classList.contains('active')) {
            
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Закрытие меню на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
}

// Адаптация для мобильных
function adaptForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    // Адаптация карты
    const mapIframe = document.querySelector('.map iframe');
    if (mapIframe) {
        if (isMobile) {
            mapIframe.style.height = '350px';
        } else {
            mapIframe.style.height = '576px';
        }
    }
    
    // Адаптация заголовка
    const heading = document.querySelector('.heading');
    if (heading && isMobile) {
        heading.style.cssText = `
            position: relative !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            text-align: center !important;
            z-index: 1 !important;
            margin-bottom: 40px !important;
        `;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Создаем мобильное меню
    createMobileMenu();
    
    // Адаптация
    adaptForMobile();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', adaptForMobile);
});
