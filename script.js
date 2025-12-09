// =====================
// ФИЛЬТРАЦИЯ ГАЛЕРЕИ (ваш оригинальный код без изменений)
// =====================

var btn1 = document.querySelector("#all");
var btn2 = document.querySelector("#hair");
var btn3 = document.querySelector("#nails");
var btn4 = document.querySelector("#makeup");

var elem1 = document.getElementById('1');
var elem2 = document.getElementById('2');
var elem3 = document.getElementById('3');
var elem4 = document.getElementById('4');
var elem5 = document.getElementById('5');
var elem6 = document.getElementById('6');
var elem7 = document.getElementById('7');
var elem8 = document.getElementById('8');
var elem9 = document.getElementById('9');

var s1 = document.querySelector("#s1");

function New(){
    elem1.style.display ="inline-block";
    elem2.style.display ="inline-block";
    elem3.style.display ="inline-block";
    elem4.style.display ="inline-block";
    elem5.style.display ="inline-block";
    elem6.style.display ="inline-block";
    elem7.style.display ="inline-block";
    elem8.style.display ="inline-block";
    elem9.style.display ="inline-block";
}

btn2.onclick=function(){
    New();
    elem1.style.display ="none";
    elem2.style.display ="none";
    elem3.style.display ="none";
    elem4.style.display ="none";
    elem5.style.display ="none";
    elem6.style.display ="none";
    elem8.style.display ="none";
    elem9.style.display ="none";
}

btn1.onclick=function(){
    New();
}

btn3.onclick=function(){
    New();
    elem1.style.display ="none";
    elem2.style.display ="none";
    elem5.style.display ="none";
    elem6.style.display ="none";
    elem7.style.display ="none";
    elem8.style.display ="none";
    elem9.style.display ="none";
}

btn4.onclick=function(){
    New();
    elem1.style.display ="none";
    elem3.style.display ="none";
    elem4.style.display ="none";
    elem7.style.display ="none";
}

// =====================
// МОБИЛЬНОЕ МЕНЮ (простой и надежный вариант)
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Инициализируем мобильное меню
    initMobileMenu();
    
    // Настройка адаптивности
    setupAdaptiveLayout();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', setupAdaptiveLayout);
});

// Основная функция инициализации мобильного меню
function initMobileMenu() {
    // Добавляем стили
    addMobileStyles();
    
    // Создаем гамбургер-кнопку
    createHamburgerButton();
    
    // Создаем мобильное меню
    createMobileMenuContent();
    
    // Настраиваем обработчики
    setupEventHandlers();
}

// Создание гамбургер-кнопки
function createHamburgerButton() {
    // Проверяем, не создана ли уже кнопка
    if (document.getElementById('mobile-hamburger')) return;
    
    // Создаем кнопку
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'mobile-hamburger';
    hamburgerBtn.className = 'mobile-hamburger';
    hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
    hamburgerBtn.setAttribute('aria-label', 'Меню');
    
    // Добавляем кнопку в header
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(hamburgerBtn);
    }
}

// Создание содержимого мобильного меню
function createMobileMenuContent() {
    // Проверяем, не создано ли уже меню
    if (document.getElementById('mobile-menu')) return;
    
    // Создаем контейнер меню
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'mobile-menu';
    
    // Создаем список меню
    const menuList = document.createElement('ul');
    
    // Получаем ссылки из основной навигации
    const navLinks = [
        { href: '/mastyxx/index.html', text: 'Главная' },
        { href: '/mastyxx/Masters/masters.html', text: 'Мастера' },
        { href: '/mastyxx/price/price.html', text: 'Прайс' },
        { href: '/mastyxx/stock/stock.html', text: 'Акции' },
        { href: '/mastyxx/reviews1/reviews.html', text: 'Отзывы' },
        { href: '/mastyxx/contacts/contacts.html', text: 'Контакты' }
    ];
    
    // Добавляем ссылки в меню
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.className = 'mobile-menu-link';
        li.appendChild(a);
        menuList.appendChild(li);
    });
    
    mobileMenu.appendChild(menuList);
    
    // Добавляем меню в body
    document.body.appendChild(mobileMenu);
}

// Настройка обработчиков событий
function setupEventHandlers() {
    const hamburgerBtn = document.getElementById('mobile-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!hamburgerBtn || !mobileMenu) return;
    
    // Обработчик клика по гамбургеру
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрытие меню при клике на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburgerBtn.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && 
            !hamburgerBtn.contains(e.target) && 
            hamburgerBtn.classList.contains('active')) {
            
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Закрытие меню на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburgerBtn.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Настройка адаптивного макета
function setupAdaptiveLayout() {
    const isMobile = window.innerWidth <= 768;
    
    // Логотип
    const logo = document.querySelector('.header__logo');
    if (logo) {
        if (isMobile) {
            // Стили для мобильной версии
            logo.style.cssText = `
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                top: 50% !important;
                margin-top: -25px !important;
                width: 70px !important;
                height: auto !important;
                z-index: 1 !important;
            `;
        } else {
            // Возвращаем десктопные стили
            logo.style.cssText = `
                position: static !important;
                left: auto !important;
                transform: none !important;
                top: auto !important;
                margin-top: -12px !important;
                margin-bottom: 30px !important;
                width: auto !important;
                height: auto !important;
                z-index: auto !important;
            `;
        }
    }
    
    // Кнопка "Запишись Online"
    const onlineBtn = document.querySelector('.bg2 .container a');
    if (onlineBtn && isMobile) {
        onlineBtn.style.cssText = `
            display: block !important;
            margin: 25px auto 0 !important;
            text-align: center !important;
            width: fit-content !important;
        `;
    }
    
    // Скрываем/показываем элементы на мобильных
    const headerImg = document.querySelector('.header__img');
    const headerNavs = document.querySelectorAll('.header__items > nav');
    
    if (isMobile) {
        // Скрываем VK и навигацию на мобильных
        if (headerImg) headerImg.style.display = 'none';
        headerNavs.forEach(nav => {
            nav.style.display = 'none';
        });
    } else {
        // Показываем VK и навигацию на десктопе
        if (headerImg) headerImg.style.display = 'block';
        headerNavs.forEach(nav => {
            nav.style.display = 'inline-block';
        });
    }
}

// Добавление стилей для мобильного меню
function addMobileStyles() {
    const styleId = 'mobile-menu-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    
    style.textContent = `
        /* Гамбургер-кнопка */
        .mobile-hamburger {
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: white;
            border: 1px solid #856A65;
            border-radius: 4px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 1001;
            padding: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .mobile-hamburger span {
            display: block;
            width: 24px;
            height: 2px;
            background: #856A65;
            margin: 3px 0;
            transition: all 0.3s ease;
        }
        
        .mobile-hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Мобильное меню */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.98);
            z-index: 1000;
            padding: 80px 20px 40px;
            overflow-y: auto;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .mobile-menu.active {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mobile-menu li {
            margin-bottom: 15px;
            text-align: center;
        }
        
        .mobile-menu-link {
            display: block;
            padding: 15px;
            font-family: 'Cormorant Garamond';
            font-weight: 600;
            font-size: 20px;
            color: #856A65;
            text-decoration: none;
            border-bottom: 1px solid rgba(133, 106, 101, 0.1);
            transition: all 0.3s ease;
        }
        
        .mobile-menu-link:hover {
            color: #CDAA7D;
            background: rgba(205, 170, 125, 0.1);
        }
        
        /* Предотвращаем прокрутку при открытом меню */
        body.menu-open {
            overflow: hidden;
        }
        
        /* Мобильная версия */
        @media (max-width: 768px) {
            .mobile-hamburger {
                display: flex;
            }
            
            /* Центрирование логотипа */
            .header__logo {
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                top: 50% !important;
                margin-top: -25px !important;
                width: 70px !important;
                z-index: 1 !important;
            }
            
            /* Хедер для мобильных */
            header {
                position: relative;
                height: 80px;
            }
            
            .header__items {
                position: relative;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            /* Адаптация главной секции */
            .main-1 img {
                height: 300px !important;
            }
            
            .bg1 {
                position: absolute !important;
                top: 30px !important;
                left: 20px !important;
                right: 20px !important;
                text-align: center !important;
            }
            
            .bg1 h1 {
                font-size: 32px !important;
                line-height: 1.2 !important;
            }
            
            .bg2 {
                width: 100% !important;
                height: auto !important;
                margin-left: 0 !important;
                padding: 30px 20px !important;
            }
            
            .bg2 .container {
                text-align: center !important;
            }
            
            .bg2 .container a {
                display: inline-block !important;
                margin: 20px auto 0 !important;
                text-align: center !important;
            }
        }
        
        /* Десктопная версия */
        @media (min-width: 769px) {
            .mobile-hamburger,
            .mobile-menu {
                display: none !important;
            }
        }
        
        /* Активная кнопка фильтрации */
        .main-links button.active {
            color: #856A65 !important;
            text-decoration: underline !important;
            text-decoration-color: #CDAA7D !important;
        }
    `;
    
    document.head.appendChild(style);
}

// =====================
// ФОРМА ЗАПИСИ
// =====================

function toggleForm() {
    const form = document.querySelector('.form');
    if (form) {
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }
}

// Закрытие формы при клике вне ее
document.addEventListener('click', function(event) {
    const form = document.querySelector('.form');
    if (form && form.style.display === 'block') {
        if (!form.contains(event.target)) {
            form.style.display = 'none';
        }
    }
});
