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
// МОБИЛЬНОЕ МЕНЮ (исправленная версия)
// =====================

// Добавляем стили сразу, чтобы они были доступны раньше
const mobileStyles = document.createElement('style');
mobileStyles.id = 'mobile-styles';
document.head.appendChild(mobileStyles);

function updateMobileStyles() {
    const isMobile = window.innerWidth <= 768;
    
    mobileStyles.textContent = `
        /* Стили для мобильного меню */
        .hamburger-btn {
            display: ${isMobile ? 'flex' : 'none'};
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 24px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .hamburger-btn span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: #856A65;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .hamburger-btn.active span:nth-child(1) {
            transform: translateY(10px) rotate(45deg);
        }
        
        .hamburger-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-btn.active span:nth-child(3) {
            transform: translateY(-10px) rotate(-45deg);
        }
        
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 1000;
            padding: 80px 20px 20px;
            overflow-y: auto;
        }
        
        .mobile-menu.active {
            display: block;
        }
        
        .mobile-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mobile-menu li {
            margin-bottom: 20px;
            text-align: center;
        }
        
        .mobile-menu a {
            font-family: 'Cormorant Garamond';
            font-weight: 600;
            font-size: 20px;
            color: #856A65;
            text-decoration: none;
            display: block;
            padding: 10px 0;
            position: relative;
        }
        
        .mobile-menu a:hover {
            color: #CDAA7D;
        }
        
        .mobile-menu a::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: #CDAA7D;
            transition: width 0.3s;
        }
        
        .mobile-menu a:hover::before {
            width: 100%;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        /* Мобильная адаптация для хедера */
        @media (max-width: 768px) {
            .header__items {
                position: relative;
                min-height: 80px;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            
            .header__logo {
                position: static !important;
                transform: none !important;
                margin: 0 auto !important;
                width: 70px !important;
                height: auto !important;
                left: auto !important;
                top: auto !important;
            }
            
            .header__img {
                display: none !important;
            }
            
            .header__items > nav {
                display: none !important;
            }
            
            .hamburger-btn {
                display: flex !important;
                position: absolute !important;
                right: 15px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
            }
        }
        
        @media (min-width: 769px) {
            .hamburger-btn,
            .mobile-menu {
                display: none !important;
            }
        }
        
        /* Стиль для активных кнопок фильтрации */
        .main-links button.active {
            color: #856A65 !important;
            text-decoration: underline !important;
            text-decoration-color: #CDAA7D !important;
        }
    `;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Создаем мобильное меню
    createMobileMenu();
    
    // Адаптируем логотип и кнопку
    adaptLayout();
    
    // Обновляем стили
    updateMobileStyles();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        adaptLayout();
        updateMobileStyles();
    });
});

// Создание мобильного меню
function createMobileMenu() {
    // Проверяем, не создано ли уже меню
    if (document.querySelector('.hamburger-btn')) return;
    
    const headerItems = document.querySelector('.header__items');
    if (!headerItems) return;
    
    // Создаем кнопку гамбургера
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
    hamburgerBtn.setAttribute('aria-label', 'Открыть меню');
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Собираем ссылки из основной навигации
    const navLinks = document.querySelectorAll('.header__items > nav a');
    const mobileList = document.createElement('ul');
    
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = link.className;
        li.appendChild(a);
        mobileList.appendChild(li);
    });
    
    mobileMenu.appendChild(mobileList);
    
    // Добавляем элементы в DOM
    document.body.appendChild(hamburgerBtn);
    document.body.appendChild(mobileMenu);
    
    // Настройка обработчиков
    setupMenuHandlers(hamburgerBtn, mobileMenu);
}

// Настройка обработчиков меню
function setupMenuHandlers(hamburgerBtn, mobileMenu) {
    // Переключение меню
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрытие при клике на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Закрытие при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Адаптация макета
function adaptLayout() {
    const isMobile = window.innerWidth <= 768;
    
    // Логотип
    const logo = document.querySelector('.header__logo');
    if (logo) {
        if (isMobile) {
            logo.style.position = 'static';
            logo.style.left = 'auto';
            logo.style.transform = 'none';
            logo.style.margin = '0 auto';
            logo.style.width = '70px';
            logo.style.height = 'auto';
        } else {
            logo.style.position = '';
            logo.style.left = '';
            logo.style.transform = '';
            logo.style.margin = '';
            logo.style.width = '';
            logo.style.height = '';
        }
    }
    
    // Кнопка "Запишись Online"
    const onlineBtn = document.querySelector('.bg2 .container a');
    if (onlineBtn) {
        if (isMobile) {
            onlineBtn.style.display = 'block';
            onlineBtn.style.margin = '20px auto 0';
            onlineBtn.style.textAlign = 'center';
        } else {
            onlineBtn.style.display = '';
            onlineBtn.style.margin = '';
            onlineBtn.style.textAlign = '';
        }
    }
    
    // Навигация и VK кнопка
    const headerNavs = document.querySelectorAll('.header__items > nav');
    const headerImg = document.querySelector('.header__img');
    
    if (isMobile) {
        if (headerNavs.length > 0) {
            headerNavs.forEach(nav => {
                nav.style.display = 'none';
            });
        }
        
        if (headerImg) {
            headerImg.style.display = 'none';
        }
    } else {
        if (headerNavs.length > 0) {
            headerNavs.forEach(nav => {
                nav.style.display = 'inline-block';
            });
        }
        
        if (headerImg) {
            headerImg.style.display = 'block';
        }
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
