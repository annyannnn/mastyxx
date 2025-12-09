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
// МОБИЛЬНОЕ МЕНЮ - финальный исправленный вариант
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Создаем гамбургер меню
    createMobileMenu();
    
    // Адаптируем для мобильных
    checkAndAdapt();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', checkAndAdapt);
});

// Основная функция создания мобильного меню
function createMobileMenu() {
    // Проверяем, не создано ли уже
    if (document.querySelector('.mobile-hamburger')) return;
    
    // Создаем контейнер для мобильного хедера
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    
    // Создаем гамбургер-кнопку
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.setAttribute('aria-label', 'Меню');
    
    // Создаем контейнер для логотипа
    const logoContainer = document.createElement('div');
    logoContainer.className = 'mobile-logo-container';
    
    // Клонируем оригинальный логотип
    const originalLogo = document.querySelector('.header__logo');
    if (originalLogo) {
        const logoClone = originalLogo.cloneNode(true);
        logoClone.classList.add('mobile-logo');
        logoContainer.appendChild(logoClone);
    }
    
    mobileHeader.appendChild(logoContainer);
    mobileHeader.appendChild(hamburger);
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu-container';
    
    // Создаем контент меню
    const menuContent = document.createElement('div');
    menuContent.className = 'mobile-nav';
    
    const ul = document.createElement('ul');
    
    // Добавляем пункты меню
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
        ul.appendChild(li);
    });
    
    menuContent.appendChild(ul);
    mobileMenu.appendChild(menuContent);
    
    // Добавляем все в body
    document.body.insertBefore(mobileHeader, document.body.firstChild);
    document.body.appendChild(mobileMenu);
    
    // Настройка обработчиков
    setupMobileMenuHandlers();
    
    // Добавляем стили
    addMobileMenuStyles();
}

// Настройка обработчиков для мобильного меню
function setupMobileMenuHandlers() {
    const hamburger = document.querySelector('.mobile-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    
    if (!hamburger || !mobileMenu) return;
    
    // Переключение меню
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Закрытие меню при клике на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target) && 
            hamburger.classList.contains('active')) {
            
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Закрытие меню на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Проверка и адаптация для мобильных
function checkAndAdapt() {
    const isMobile = window.innerWidth <= 768;
    
    // Показываем/скрываем мобильный хедер
    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader) {
        mobileHeader.style.display = isMobile ? 'block' : 'none';
    }
    
    // Скрываем/показываем оригинальный хедер
    const originalHeader = document.querySelector('header');
    if (originalHeader) {
        originalHeader.style.display = isMobile ? 'none' : 'block';
    }
    
    // Центрируем кнопку "Запишись Online" на мобильных
    const onlineBtn = document.querySelector('.bg2 .container a');
    if (onlineBtn) {
        if (isMobile) {
            onlineBtn.style.cssText = `
                display: block !important;
                margin: 20px auto 0 !important;
                text-align: center !important;
                width: fit-content !important;
            `;
        } else {
            onlineBtn.style.cssText = '';
        }
    }
}

// Добавление стилей для мобильного меню
function addMobileMenuStyles() {
    const styleId = 'mobile-menu-clean-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* Мобильный хедер */
        .mobile-header {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 70px;
            background: white;
            z-index: 1001;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }
        
        /* Гамбургер-кнопка */
        .mobile-hamburger {
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .mobile-hamburger span {
            display: block;
            width: 24px;
            height: 3px;
            background: #856A65;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
        }
        
        .mobile-hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        /* Контейнер для логотипа */
        .mobile-logo-container {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .mobile-logo {
            width: 60px;
            height: auto;
        }
        
        /* Мобильное меню */
        .mobile-menu-container {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
        }
        
        .mobile-menu-container.active {
            display: block;
        }
        
        .mobile-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mobile-nav li {
            margin-bottom: 20px;
            text-align: center;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInUp 0.3s ease forwards;
        }
        
        .mobile-nav li:nth-child(1) { animation-delay: 0.1s; }
        .mobile-nav li:nth-child(2) { animation-delay: 0.15s; }
        .mobile-nav li:nth-child(3) { animation-delay: 0.2s; }
        .mobile-nav li:nth-child(4) { animation-delay: 0.25s; }
        .mobile-nav li:nth-child(5) { animation-delay: 0.3s; }
        .mobile-nav li:nth-child(6) { animation-delay: 0.35s; }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-nav a {
            display: block;
            padding: 15px;
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
            font-size: 20px;
            color: #856A65;
            text-decoration: none;
            border-bottom: 1px solid rgba(133, 106, 101, 0.1);
            transition: all 0.3s;
        }
        
        .mobile-nav a:hover {
            color: #CDAA7D;
            background: rgba(205, 170, 125, 0.1);
        }
        
        /* Отключение прокрутки при открытом меню */
        body.no-scroll {
            overflow: hidden;
        }
        
        /* Мобильная адаптация */
        @media (max-width: 768px) {
            /* Показываем мобильный хедер, скрываем оригинальный */
            .mobile-header {
                display: flex !important;
            }
            
            header {
                display: none !important;
            }
            
            /* Добавляем отступ для контента под фиксированным хедером */
            body {
                padding-top: 70px;
            }
            
            /* Центрирование кнопки "Запишись Online" */
            .bg2 .container a {
                display: block !important;
                margin: 20px auto 0 !important;
                text-align: center !important;
                width: fit-content !important;
            }
            
            /* Адаптация главной секции */
            .main-1 img {
                height: 250px !important;
                object-fit: cover !important;
            }
            
            .bg1 {
                position: absolute !important;
                top: 30px !important;
                left: 20px !important;
                right: 20px !important;
                text-align: center !important;
            }
            
            .bg1 h1 {
                font-size: 28px !important;
                line-height: 1.2 !important;
            }
            
            .bg2 {
                width: 100% !important;
                margin-left: 0 !important;
                padding: 30px 20px !important;
                height: auto !important;
            }
            
            /* Адаптация галереи */
            .main-4 .container div {
                width: 100% !important;
                margin-right: 0 !important;
            }
            
            .main-links {
                width: 100% !important;
                margin-left: 0 !important;
                overflow-x: auto !important;
                white-space: nowrap !important;
            }
        }
        
        /* Десктопная версия */
        @media (min-width: 769px) {
            .mobile-header,
            .mobile-menu-container {
                display: none !important;
            }
            
            header {
                display: block !important;
            }
            
            body {
                padding-top: 0 !important;
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
