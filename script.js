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
// МОБИЛЬНОЕ МЕНЮ - простой работающий вариант
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Создаем гамбургер меню - простой вариант
    createSimpleMobileMenu();
    
    // Запускаем адаптацию
    adaptForMobile();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', adaptForMobile);
});

// Простой рабочий гамбургер меню
function createSimpleMobileMenu() {
    // Проверяем, не создано ли уже
    if (document.getElementById('mobile-hamburger')) return;
    
    // Создаем простой чекбокс для управления меню (чистый CSS подход)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'menu-toggle';
    checkbox.className = 'menu-toggle-checkbox';
    
    // Создаем кнопку гамбургера
    const hamburger = document.createElement('label');
    hamburger.htmlFor = 'menu-toggle';
    hamburger.id = 'mobile-hamburger';
    hamburger.className = 'mobile-hamburger-btn';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu-wrapper';
    
    // Создаем контент меню
    const menuContent = document.createElement('div');
    menuContent.className = 'mobile-menu-content';
    
    // Добавляем ссылки из навигации
    const links = [
        {href: '/mastyxx/index.html', text: 'Главная'},
        {href: '/mastyxx/Masters/masters.html', text: 'Мастера'},
        {href: '/mastyxx/price/price.html', text: 'Прайс'},
        {href: '/mastyxx/stock/stock.html', text: 'Акции'},
        {href: '/mastyxx/reviews1/reviews.html', text: 'Отзывы'},
        {href: '/mastyxx/contacts/contacts.html', text: 'Контакты'}
    ];
    
    const ul = document.createElement('ul');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    menuContent.appendChild(ul);
    mobileMenu.appendChild(menuContent);
    
    // Добавляем все в body
    document.body.appendChild(checkbox);
    document.body.appendChild(hamburger);
    document.body.appendChild(mobileMenu);
    
    // Добавляем стили
    addMobileMenuStyles();
}

// Добавление стилей
function addMobileMenuStyles() {
    const styleId = 'mobile-menu-final-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* Скрываем чекбокс */
        .menu-toggle-checkbox {
            display: none;
        }
        
        /* Кнопка гамбургера - очень простая */
        .mobile-hamburger-btn {
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: white;
            border: 2px solid #856A65;
            border-radius: 5px;
            cursor: pointer;
            z-index: 10000;
            padding: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .mobile-hamburger-btn span {
            display: block;
            width: 100%;
            height: 3px;
            background: #856A65;
            margin: 4px 0;
            transition: 0.3s;
        }
        
        /* Меню */
        .mobile-menu-wrapper {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            z-index: 9999;
            padding-top: 80px;
            overflow-y: auto;
        }
        
        .mobile-menu-content {
            padding: 20px;
        }
        
        .mobile-menu-content ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mobile-menu-content li {
            margin-bottom: 20px;
            text-align: center;
        }
        
        .mobile-menu-content a {
            display: block;
            padding: 15px;
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
            font-size: 22px;
            color: #856A65;
            text-decoration: none;
            border-bottom: 1px solid rgba(133, 106, 101, 0.2);
        }
        
        .mobile-menu-content a:hover {
            color: #CDAA7D;
            background: rgba(205, 170, 125, 0.1);
        }
        
        /* Анимация гамбургера */
        #menu-toggle:checked ~ .mobile-hamburger-btn span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        #menu-toggle:checked ~ .mobile-hamburger-btn span:nth-child(2) {
            opacity: 0;
        }
        
        #menu-toggle:checked ~ .mobile-hamburger-btn span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        #menu-toggle:checked ~ .mobile-menu-wrapper {
            display: block;
        }
        
        /* Отключаем прокрутку при открытом меню */
        #menu-toggle:checked ~ .mobile-menu-wrapper {
            overflow: hidden;
        }
        
        /* Мобильная адаптация - ПРИОРИТЕТНЫЕ СТИЛИ */
        @media (max-width: 768px) {
            /* Показываем гамбургер */
            .mobile-hamburger-btn {
                display: block !important;
            }
            
            /* Скрываем оригинальные элементы на мобильных */
            .header__img,
            .header__items > nav {
                display: none !important;
            }
            
            /* ЦЕНТРИРОВАНИЕ ЛОГОТИПА - ГАРАНТИРОВАННО */
            .header__logo {
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                top: 40px !important;
                margin: 0 !important;
                width: 70px !important;
                height: auto !important;
                z-index: 999 !important;
            }
            
            /* Корректируем хедер */
            header {
                position: relative !important;
                height: 100px !important;
            }
            
            .header__items {
                position: relative !important;
                height: 100px !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
            }
            
            /* Центрируем кнопку "Запишись Online" */
            .bg2 .container a {
                display: block !important;
                margin: 25px auto 0 !important;
                text-align: center !important;
                width: fit-content !important;
            }
            
            /* Адаптация главного изображения */
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
        }
        
        /* Десктоп - скрываем мобильное меню */
        @media (min-width: 769px) {
            .mobile-hamburger-btn,
            .mobile-menu-wrapper,
            .menu-toggle-checkbox {
                display: none !important;
            }
            
            .header__img,
            .header__items > nav {
                display: inline-block !important;
            }
            
            .header__logo {
                position: static !important;
                transform: none !important;
                margin-top: -12px !important;
                margin-bottom: 30px !important;
                width: auto !important;
                height: auto !important;
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

// Адаптация для мобильных
function adaptForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    // Принудительно применяем стили для логотипа
    const logo = document.querySelector('.header__logo');
    if (logo) {
        if (isMobile) {
            // Мобильные стили - с очень высоким приоритетом
            logo.style.cssText = `
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                top: 40px !important;
                margin: 0 !important;
                width: 70px !important;
                height: auto !important;
                z-index: 1 !important;
            `;
        } else {
            // Десктоп стили
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
    
    // Центрируем кнопку "Запишись Online"
    const onlineBtn = document.querySelector('.bg2 .container a');
    if (onlineBtn && isMobile) {
        onlineBtn.style.cssText = `
            display: block !important;
            margin: 25px auto 0 !important;
            text-align: center !important;
            width: fit-content !important;
        `;
    } else if (onlineBtn) {
        onlineBtn.style.cssText = '';
    }
    
    // Скрываем/показываем элементы навигации
    const headerImg = document.querySelector('.header__img');
    const headerNavs = document.querySelectorAll('.header__items > nav');
    
    if (isMobile) {
        if (headerImg) headerImg.style.display = 'none';
        headerNavs.forEach(nav => {
            nav.style.display = 'none';
        });
    } else {
        if (headerImg) headerImg.style.display = 'block';
        headerNavs.forEach(nav => {
            nav.style.display = 'inline-block';
        });
    }
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
