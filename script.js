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
        
        /* Исправление заголовка "Салон красоты Masty" - сделаем его видимым */
        .main-1 {
            position: relative !important;
        }
        
        .main-1 img {
            width: 100% !important;
            height: 300px !important;
            object-fit: cover !important;
        }
        
        .bg1 {
            position: absolute !important;
            top: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            text-align: center !important;
            z-index: 5 !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .bg1 h1 {
            font-size: 28px !important;
            line-height: 1.2 !important;
            color: #CABEBC !important;
            text-shadow: 2px 2px 5px rgba(0,0,0,0.8) !important;
            margin: 0 !important;
            padding: 10px 15px !important;
            background: rgba(133, 106, 101, 0.6) !important;
            border-radius: 8px !important;
            font-weight: 700 !important;
        }
        
        .bg1 span {
            font-size: 28px !important;
            display: block !important;
            margin-top: 5px !important;
            font-weight: 400 !important;
        }
        
        /* Центрируем кнопку "Запишись Online" */
        .bg2 .container a {
            display: block !important;
            margin: 20px auto 0 !important;
            text-align: center !important;
            width: fit-content !important;
            font-size: 16px !important;
            padding: 12px 25px !important;
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
        
        /* Изменяем расположение кнопок соцсетей в футере - МАКС справа от ВК */
        .social {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 20px !important;
        }
        
        .social h2 {
            width: 100% !important;
            text-align: center !important;
            margin-bottom: 15px !important;
        }
        
        .social button {
            display: inline-block !important;
            margin: 0 !important;
            width: 40px !important;
            height: 40px !important;
        }
        
        .social button img {
            width: 100% !important;
            height: 100% !important;
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
    
    /* Активная кнопка фильтрации */
    .main-links button.active {
        color: #856A65 !important;
        text-decoration: underline !important;
        text-decoration-color: #CDAA7D !important;
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
    
    // Центрируем кнопку "Запишись Online"
    const onlineBtn = document.querySelector('.bg2 .container a');
    if (onlineBtn) {
        if (isMobile) {
            onlineBtn.style.cssText = `
                display: block !important;
                margin: 20px auto 0 !important;
                text-align: center !important;
                width: fit-content !important;
                font-size: 16px !important;
                padding: 12px 25px !important;
            `;
        } else {
            onlineBtn.style.cssText = '';
        }
    }
    
    // Исправляем заголовок на мобильных
    if (isMobile) {
        const bg1 = document.querySelector('.bg1');
        if (bg1) {
            bg1.style.cssText = `
                position: absolute !important;
                top: 50px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: 90% !important;
                text-align: center !important;
                z-index: 5 !important;
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
            
            const h1 = bg1.querySelector('h1');
            if (h1) {
                h1.style.cssText = `
                    font-size: 28px !important;
                    line-height: 1.2 !important;
                    color: #CABEBC !important;
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.8) !important;
                    margin: 0 !important;
                    padding: 10px 15px !important;
                    background: rgba(133, 106, 101, 0.6) !important;
                    border-radius: 8px !important;
                    font-weight: 700 !important;
                `;
            }
            
            const span = bg1.querySelector('span');
            if (span) {
                span.style.cssText = `
                    font-size: 28px !important;
                    display: block !important;
                    margin-top: 5px !important;
                    font-weight: 400 !important;
                `;
            }
        }
        
        // Исправляем расположение кнопок соцсетей в футере
        const socialSection = document.querySelector('.social');
        if (socialSection) {
            socialSection.style.cssText = `
                display: flex !important;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 20px !important;
            `;
            
            // Находим кнопки и делаем их рядом
            const buttons = socialSection.querySelectorAll('button');
            if (buttons.length >= 2) {
                buttons.forEach(button => {
                    button.style.cssText = `
                        display: inline-block !important;
                        margin: 0 !important;
                        width: 40px !important;
                        height: 40px !important;
                    `;
                });
            }
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем активную кнопку в галерее
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Создаем мобильное меню
    createMobileMenu();
    
    // Адаптация
    adaptForMobile();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', adaptForMobile);
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
