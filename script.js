// =====================
// МОБИЛЬНОЕ МЕНЮ
// =====================

// Создаем и добавляем кнопку гамбургер-меню, если ее нет
function initMobileMenu() {
    const headerItems = document.querySelector('.header__items');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    
    // Если кнопка меню еще не существует, создаем ее
    if (!mobileMenuToggle && headerItems) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.id = 'mobile-menu';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        headerItems.appendChild(menuToggle);
        
        // Создаем мобильное меню только с навигацией хедера
        createMobileMenu();
    } else if (mobileMenuToggle && !document.querySelector('.mobile-menu-container')) {
        // Если кнопка уже существует, но меню не создано
        createMobileMenu();
    }
}

// Создание мобильного меню ТОЛЬКО с навигацией хедера
function createMobileMenu() {
    // Проверяем, не создано ли уже мобильное меню
    if (document.querySelector('.mobile-menu-container')) return;
    
    // Находим ТОЛЬКО навигацию, которая является прямым потомком .header__items
    const headerNavs = document.querySelectorAll('.header__items > nav');
    
    // Создаем контейнер для мобильного меню
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu-container';
    
    // Создаем список для мобильного меню
    const mobileMenuList = document.createElement('ul');
    
    // Добавляем все пункты из навигации хедера
    headerNavs.forEach(nav => {
        const navItems = nav.querySelectorAll('li');
        navItems.forEach(item => {
            // Клонируем элемент и проверяем, что это именно ссылка навигации
            const link = item.querySelector('a');
            if (link && link.getAttribute('href')) {
                // Создаем новый li с той же структурой
                const newLi = document.createElement('li');
                const newLink = document.createElement('a');
                
                // Копируем все атрибуты и содержимое
                newLink.href = link.href;
                newLink.textContent = link.textContent;
                
                // Копируем классы и стили
                newLink.className = link.className;
                newLink.style.cssText = link.style.cssText;
                
                newLi.appendChild(newLink);
                mobileMenuList.appendChild(newLi);
            }
        });
    });
    
    mobileMenuContainer.appendChild(mobileMenuList);
    
    // Добавляем контейнер меню в header__items
    const headerItems = document.querySelector('.header__items');
    if (headerItems) {
        headerItems.appendChild(mobileMenuContainer);
    }
    
    // Добавляем стили для мобильного меню
    addMobileMenuStyles();
}

// Добавление стилей для мобильного меню
function addMobileMenuStyles() {
    // Проверяем, не добавлены ли стили уже
    if (document.querySelector('#mobile-menu-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = `
        /* Стили для мобильного меню */
        .mobile-menu-container {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 20px;
            border-top: 1px solid #e0e0e0;
        }
        
        .mobile-menu-active .mobile-menu-container {
            display: block;
        }
        
        .mobile-menu-container ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            padding: 0;
            margin: 0;
        }
        
        .mobile-menu-container li {
            list-style: none;
            width: 100%;
            text-align: center;
        }
        
        .mobile-menu-container a {
            display: block;
            padding: 10px 0;
            font-family: 'Cormorant Garamond';
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 130%;
            text-decoration: none;
            color: #856A65;
            position: relative;
        }
        
        .mobile-menu-container a::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 1.5px;
            background-color: #CDAA7D;
            transition: width 0.35s;
        }
        
        .mobile-menu-container a:hover::before {
            width: 100%;
        }
        
        /* Кнопка гамбургер-меню */
        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
            background: none;
            border: none;
            outline: none;
        }
        
        .menu-toggle span {
            width: 25px;
            height: 3px;
            background-color: #856A65;
            margin: 3px 0;
            transition: 0.4s;
        }
        
        /* Стили для скрытия оригинальной навигации на мобильных */
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
                order: 2;
                margin-left: auto;
            }
            
            /* Скрываем оригинальную навигацию в хедере */
            .header__items > nav {
                display: none !important;
            }
            
            /* Скрываем VK кнопку на мобильных */
            .header__img {
                display: none;
            }
            
            /* Центрируем логотип на мобильных */
            .header__logo {
                order: 1;
                margin: 0 auto !important;
                width: 80px !important;
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
            }
            
            /* Центрируем кнопку "Запишись Online" на мобильных */
            .bg2 .container {
                text-align: center;
                padding: 20px;
            }
            
            .bg2 .container a {
                display: inline-block !important;
                margin: 20px auto 0 !important;
                padding: 12px 30px !important;
                font-size: 16px !important;
                text-align: center;
            }
        }
        
        /* Десктопные стили - показываем обычную навигацию */
        @media (min-width: 769px) {
            .mobile-menu-container {
                display: none !important;
            }
            
            .menu-toggle {
                display: none !important;
            }
            
            .header__items > nav {
                display: inline-block !important;
            }
            
            .header__img {
                display: block !important;
            }
            
            .header__logo {
                position: static !important;
                transform: none !important;
                margin-top: -12px !important;
                margin-bottom: 30px !important;
                width: auto !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Настройка мобильного меню
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const body = document.getElementById('body');
    
    if (!menuToggle || !body) return;
    
    // Обработчик клика по кнопке меню
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Останавливаем всплытие
        body.classList.toggle('mobile-menu-active');
        
        // Анимация гамбургера в крестик
        const spans = this.querySelectorAll('span');
        if (body.classList.contains('mobile-menu-active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку в мобильном меню
    document.addEventListener('click', function(event) {
        const mobileMenu = document.querySelector('.mobile-menu-container');
        const menuToggle = document.getElementById('mobile-menu');
        
        // Если клик на ссылку в мобильном меню
        if (mobileMenu && mobileMenu.contains(event.target) && 
            event.target.tagName === 'A' && 
            body.classList.contains('mobile-menu-active')) {
            
            body.classList.remove('mobile-menu-active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при изменении размера окна на десктопный
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            body.classList.remove('mobile-menu-active');
            const menuToggle = document.getElementById('mobile-menu');
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

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

// =====================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем мобильное меню
    initMobileMenu();
    setupMobileMenu();
    
    // Адаптируем изображения
    const mainImage = document.querySelector('.main-1 img');
    if (mainImage && window.innerWidth <= 768) {
        mainImage.style.height = 'auto';
    }
    
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Добавляем адаптивные стили для кнопки "Запишись Online"
    addAdaptiveStyles();
});

// Добавляем адаптивные стили
function addAdaptiveStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Адаптивные стили для мобильной версии */
        @media (max-width: 768px) {
            /* Центрируем логотип в хедере */
            .header__logo {
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                margin: 0 auto !important;
            }
            
            /* Центрируем кнопку "Запишись Online" */
            .bg2 .container {
                text-align: center;
                padding: 20px !important;
            }
            
            .bg2 .container a {
                display: inline-block !important;
                margin: 20px auto 0 !important;
                text-align: center;
                width: auto !important;
            }
            
            /* Адаптируем главный заголовок */
            .bg1 h1 {
                text-align: center;
                font-size: clamp(28px, 8vw, 48px) !important;
            }
            
            /* Адаптируем секцию с услугами */
            .main-3 {
                padding: 20px 10px !important;
            }
            
            .main-3 .container {
                margin-bottom: 20px !important;
                margin-right: 0 !important;
                width: 100% !important;
            }
            
            /* Адаптируем галерею */
            .main-4 {
                padding: 20px 10px !important;
            }
            
            .main-4 .container div {
                width: 100% !important;
                margin-right: 0 !important;
                margin-bottom: 10px;
            }
            
            .main-4 .container img {
                margin-right: 0 !important;
                width: 100% !important;
                height: auto;
            }
            
            .main-links {
                width: 100% !important;
                margin-left: 0 !important;
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 10px;
            }
            
            .main-links ul {
                display: flex;
                flex-wrap: nowrap;
                justify-content: flex-start;
            }
            
            .main-links li {
                margin-right: 15px !important;
                flex-shrink: 0;
            }
            
            .main-links button {
                font-size: 18px !important;
                white-space: nowrap;
            }
        }
        
        /* Стиль для активной кнопки фильтрации */
        .main-links button.active {
            color: #856A65 !important;
            text-decoration: underline !important;
            text-decoration-color: #CDAA7D !important;
        }
        
        /* Для планшетов */
        @media (min-width: 769px) and (max-width: 1024px) {
            .header__items > nav ul {
                gap: 40px !important;
            }
            
            .main-3 .container {
                width: 45% !important;
                margin-right: 10px !important;
            }
            
            .main-4 .container div {
                width: 30% !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Адаптация изображений
    const mainImage = document.querySelector('.main-1 img');
    if (mainImage && window.innerWidth <= 768) {
        mainImage.style.height = 'auto';
    }
    
    // Автоматическое закрытие меню при переходе на десктоп
    if (window.innerWidth > 768) {
        const body = document.getElementById('body');
        const menuToggle = document.getElementById('mobile-menu');
        
        if (body && body.classList.contains('mobile-menu-active')) {
            body.classList.remove('mobile-menu-active');
            
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
});

// ... предыдущий код скрипта до конца ...

// =====================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем мобильное меню
    initMobileMenu();
    setupMobileMenu();
    
    // Адаптируем изображения
    const mainImage = document.querySelector('.main-1 img');
    if (mainImage && window.innerWidth <= 768) {
        mainImage.style.height = 'auto';
    }
    
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Принудительная центровка логотипа на мобильных
    adaptLogoPosition();
});

// Функция для адаптации позиции логотипа
function adaptLogoPosition() {
    const logo = document.querySelector('.header__logo');
    const headerItems = document.querySelector('.header__items');
    
    if (window.innerWidth <= 768 && logo && headerItems) {
        // Добавляем класс для мобильного хедера
        headerItems.classList.add('mobile-header');
        
        // Принудительно центрируем логотип
        logo.style.position = 'absolute';
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%)';
        logo.style.margin = '0';
        
        // Центрируем кнопку "Запишись Online"
        const onlineButton = document.querySelector('.bg2 .container a');
        if (onlineButton) {
            const container = onlineButton.closest('.container');
            if (container) {
                container.style.textAlign = 'center';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.alignItems = 'center';
            }
            onlineButton.style.margin = '20px auto 0';
            onlineButton.style.display = 'block';
        }
    }
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Адаптация изображений
    const mainImage = document.querySelector('.main-1 img');
    if (mainImage && window.innerWidth <= 768) {
        mainImage.style.height = 'auto';
    }
    
    // Адаптация позиции логотипа
    adaptLogoPosition();
    
    // Автоматическое закрытие меню при переходе на десктоп
    if (window.innerWidth > 768) {
        const body = document.getElementById('body');
        const menuToggle = document.getElementById('mobile-menu');
        
        if (body && body.classList.contains('mobile-menu-active')) {
            body.classList.remove('mobile-menu-active');
            
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
        
        // Возвращаем нормальное отображение на десктопе
        const headerItems = document.querySelector('.header__items');
        if (headerItems) {
            headerItems.classList.remove('mobile-header');
        }
        
        const logo = document.querySelector('.header__logo');
        if (logo) {
            logo.style.position = '';
            logo.style.left = '';
            logo.style.transform = '';
            logo.style.margin = '';
        }
        
        const onlineButton = document.querySelector('.bg2 .container a');
        if (onlineButton) {
            const container = onlineButton.closest('.container');
            if (container) {
                container.style.textAlign = '';
                container.style.display = '';
                container.style.flexDirection = '';
                container.style.alignItems = '';
            }
            onlineButton.style.margin = '';
            onlineButton.style.display = '';
        }
    }
});

// Добавляем стили для мобильной адаптации
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    /* Класс для мобильного хедера */
    .mobile-header {
        position: relative !important;
        min-height: 80px !important;
    }
    
    /* Медиазапрос для очень точного центрирования */
    @media (max-width: 768px) {
        /* Центрирование логотипа с более высоким приоритетом */
        body .header__items .header__logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(-50%) !important;
            top: 50% !important;
            margin: 0 !important;
            width: 80px !important;
            z-index: 1 !important;
        }
        
        /* Центрирование кнопки "Запишись Online" */
        body .main-1 .bg2 .container {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 30px 20px !important;
        }
        
        body .main-1 .bg2 .container a {
            display: inline-block !important;
            margin: 25px auto 0 !important;
            padding: 12px 25px !important;
            text-align: center !important;
            width: auto !important;
            min-width: 200px !important;
        }
    }
`;
document.head.appendChild(mobileStyles);

