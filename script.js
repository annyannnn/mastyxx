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
// МОБИЛЬНОЕ МЕНЮ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Создаем и настраиваем мобильное меню
    setupMobileMenu();
    
    // Адаптация для мобильных
    adaptMobileLayout();
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', adaptMobileLayout);
});

// Создание и настройка мобильного меню
function setupMobileMenu() {
    // Проверяем, есть ли уже гамбургер-меню
    if (document.querySelector('.hamburger-btn')) return;
    
    const headerItems = document.querySelector('.header__items');
    if (!headerItems) return;
    
    // Создаем кнопку гамбургера
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
    hamburgerBtn.setAttribute('aria-label', 'Меню');
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Собираем все ссылки из навигации хедера
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
    headerItems.appendChild(hamburgerBtn);
    document.body.appendChild(mobileMenu);
    
    // Настраиваем обработчики событий
    setupMobileMenuHandlers(hamburgerBtn, mobileMenu);
    
    // Добавляем стили
    addMobileStyles();
}

// Настройка обработчиков для мобильного меню
function setupMobileMenuHandlers(hamburgerBtn, mobileMenu) {
    // Переключение меню
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Закрытие меню при клике на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburgerBtn.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Закрытие меню при изменении размера окна (на десктопе)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Адаптация макета для мобильных
function adaptMobileLayout() {
    const isMobile = window.innerWidth <= 768;
    const logo = document.querySelector('.header__logo');
    
    if (isMobile) {
        // Центрируем логотип
        if (logo) {
            logo.style.position = 'absolute';
            logo.style.left = '50%';
            logo.style.transform = 'translateX(-50%)';
            logo.style.top = '50%';
            logo.style.marginTop = '-25px';
            logo.style.width = '80px';
            logo.style.height = 'auto';
        }
        
        // Скрываем оригинальную навигацию и VK
        const headerNavs = document.querySelectorAll('.header__items > nav');
        const headerImg = document.querySelector('.header__img');
        
        if (headerNavs.length > 0) {
            headerNavs.forEach(nav => {
                nav.style.display = 'none';
            });
        }
        
        if (headerImg) {
            headerImg.style.display = 'none';
        }
        
        // Центрируем кнопку "Запишись Online"
        const onlineBtn = document.querySelector('.bg2 .container a');
        if (onlineBtn) {
            onlineBtn.style.display = 'block';
            onlineBtn.style.margin = '20px auto 0';
            onlineBtn.style.textAlign = 'center';
        }
    } else {
        // Возвращаем десктопный вид
        if (logo) {
            logo.style.position = '';
            logo.style.left = '';
            logo.style.transform = '';
            logo.style.top = '';
            logo.style.marginTop = '';
            logo.style.width = '';
            logo.style.height = '';
        }
        
        const headerNavs = document.querySelectorAll('.header__items > nav');
        const headerImg = document.querySelector('.header__img');
        
        if (headerNavs.length > 0) {
            headerNavs.forEach(nav => {
                nav.style.display = 'inline-block';
            });
        }
        
        if (headerImg) {
            headerImg.style.display = 'block';
        }
        
        const onlineBtn = document.querySelector('.bg2 .container a');
        if (onlineBtn) {
            onlineBtn.style.display = '';
            onlineBtn.style.margin = '';
            onlineBtn.style.textAlign = '';
        }
    }
}

// Добавление стилей для мобильного меню
function addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Стили для гамбургер-кнопки */
        .hamburger-btn {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 24px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
            margin-left: auto;
            order: 2;
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
        
        /* Мобильное меню */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 1000;
            padding: 100px 20px 40px;
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
            margin-bottom: 25px;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .mobile-menu.active li {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu li:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu li:nth-child(2) { transition-delay: 0.15s; }
        .mobile-menu li:nth-child(3) { transition-delay: 0.2s; }
        .mobile-menu li:nth-child(4) { transition-delay: 0.25s; }
        .mobile-menu li:nth-child(5) { transition-delay: 0.3s; }
        .mobile-menu li:nth-child(6) { transition-delay: 0.35s; }
        
        .mobile-menu a {
            font-family: 'Cormorant Garamond';
            font-weight: 600;
            font-size: 24px;
            color: #856A65;
            text-decoration: none;
            display: block;
            padding: 12px 0;
            position: relative;
            transition: color 0.3s ease;
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
        
        /* Отключение прокрутки при открытом меню */
        body.no-scroll {
            overflow: hidden;
        }
        
        /* Медиазапросы для мобильных */
        @media (max-width: 768px) {
            .hamburger-btn {
                display: flex;
            }
            
            /* Центрирование логотипа */
            .header__logo {
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                top: 50% !important;
                margin-top: -25px !important;
                width: 80px !important;
                height: auto !important;
                z-index: 1;
            }
            
            /* Адаптация главной секции */
            .main-1 img {
                height: 300px !important;
            }
            
            .bg1 {
                position: absolute !important;
                top: 50px !important;
                left: 20px !important;
                right: 20px !important;
                text-align: center !important;
            }
            
            .bg1 h1 {
                font-size: 32px !important;
            }
            
            .bg2 {
                width: 100% !important;
                margin-left: 0 !important;
                padding: 30px 20px !important;
            }
            
            .bg2 .container {
                text-align: center !important;
                padding: 0 !important;
            }
            
            .bg2 .container a {
                display: inline-block !important;
                margin: 25px auto 0 !important;
                text-align: center !important;
            }
        }
        
        /* Десктопные стили */
        @media (min-width: 769px) {
            .hamburger-btn,
            .mobile-menu {
                display: none !important;
            }
        }
        
        /* Стиль для активной кнопки фильтрации */
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
