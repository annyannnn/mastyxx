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
// МОБИЛЬНОЕ МЕНЮ (простая версия)
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Адаптация для мобильных
    adaptMobileLayout();
    
    // Создаем гамбургер-меню, если его нет
    createHamburgerMenu();
});

// Создание гамбургер-меню
function createHamburgerMenu() {
    // Проверяем, есть ли уже гамбургер-меню
    if (document.querySelector('.hamburger-menu')) return;
    
    // Создаем кнопку гамбургера
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-menu';
    hamburgerBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-nav';
    
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
    
    // Добавляем элементы в хедер
    const headerItems = document.querySelector('.header__items');
    if (headerItems) {
        headerItems.appendChild(hamburgerBtn);
        document.body.appendChild(mobileMenu);
    }
    
    // Добавляем обработчики
    setupMobileMenu(hamburgerBtn, mobileMenu);
}

// Настройка мобильного меню
function setupMobileMenu(hamburgerBtn, mobileMenu) {
    // Переключение меню по клику на гамбургер
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрытие меню по клику на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Закрытие меню по клику вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Адаптация макета для мобильных
function adaptMobileLayout() {
    // Проверяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Центрируем логотип
        const logo = document.querySelector('.header__logo');
        if (logo) {
            logo.style.position = 'absolute';
            logo.style.left = '50%';
            logo.style.transform = 'translateX(-50%)';
            logo.style.margin = '0';
        }
        
        // Центрируем кнопку "Запишись Online"
        const onlineBtn = document.querySelector('.bg2 .container a');
        if (onlineBtn) {
            onlineBtn.style.display = 'block';
            onlineBtn.style.margin = '20px auto 0';
            onlineBtn.style.textAlign = 'center';
        }
    }
}

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    adaptMobileLayout();
});

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
// ДОБАВЛЯЕМ СТИЛИ ЧЕРЕЗ JS
// =====================

const styles = document.createElement('style');
styles.textContent = `
    /* Стили для гамбургер-меню */
    .hamburger-menu {
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
    }
    
    .hamburger-menu span {
        display: block;
        width: 100%;
        height: 3px;
        background-color: #856A65;
        transition: all 0.3s ease;
    }
    
    .hamburger-menu.active span:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }
    
    .hamburger-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger-menu.active span:nth-child(3) {
        transform: translateY(-10px) rotate(-45deg);
    }
    
    /* Мобильная навигация */
    .mobile-nav {
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
    
    .mobile-nav.active {
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
    }
    
    .mobile-nav a {
        font-family: 'Cormorant Garamond';
        font-weight: 600;
        font-size: 20px;
        color: #856A65;
        text-decoration: none;
        display: block;
        padding: 10px 0;
        position: relative;
    }
    
    .mobile-nav a::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background-color: #CDAA7D;
        transition: width 0.3s;
    }
    
    .mobile-nav a:hover::before {
        width: 100%;
    }
    
    /* Медиазапросы для мобильных */
    @media (max-width: 768px) {
        /* Показываем гамбургер-меню */
        .hamburger-menu {
            display: flex;
            order: 2;
            margin-left: auto;
        }
        
        /* Скрываем оригинальную навигацию и VK */
        .header__items > nav,
        .header__img {
            display: none !important;
        }
        
        /* Центрируем логотип */
        .header__logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
            width: 70px !important;
            height: auto !important;
        }
        
        /* Адаптация главной секции */
        .main-1 {
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
        
        .main-1 img {
            width: 100% !important;
            height: 300px !important;
            object-fit: cover !important;
        }
        
        .bg1 {
            position: absolute !important;
            top: 50px !important;
            left: 0 !important;
            right: 0 !important;
            text-align: center !important;
            margin: 0 !important;
        }
        
        .bg1 h1 {
            font-size: 36px !important;
            line-height: 1.2 !important;
        }
        
        .bg2 {
            width: 100% !important;
            margin-left: 0 !important;
            height: auto !important;
            padding: 30px 20px !important;
        }
        
        .bg2 .container {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            text-align: center !important;
        }
        
        .bg2 .container a {
            display: inline-block !important;
            margin: 20px auto 0 !important;
            padding: 12px 30px !important;
            text-align: center !important;
        }
        
        /* Предотвращаем прокрутку при открытом меню */
        body.menu-open {
            overflow: hidden;
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
        }
        
        .main-links ul {
            display: flex;
            flex-wrap: nowrap;
        }
        
        .main-links li {
            flex-shrink: 0;
        }
    }
    
    /* Очень маленькие экраны */
    @media (max-width: 480px) {
        .header__logo {
            width: 60px !important;
        }
        
        .bg1 h1 {
            font-size: 28px !important;
        }
        
        .bg2 .container a {
            font-size: 16px !important;
            padding: 10px 20px !important;
        }
    }
    
    /* Стили для десктопа */
    @media (min-width: 769px) {
        .hamburger-menu,
        .mobile-nav {
            display: none !important;
        }
        
        .header__items > nav,
        .header__img {
            display: inline-block !important;
        }
    }
    
    /* Стиль для активных кнопок фильтрации */
    .main-links button.active {
        color: #856A65 !important;
        text-decoration: underline !important;
        text-decoration-color: #CDAA7D !important;
    }
`;
document.head.appendChild(styles);
