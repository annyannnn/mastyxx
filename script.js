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
    
    // Находим ТОЛЬКО навигацию в хедере (игнорируем навигацию в main-4)
    const headerNavs = document.querySelectorAll('header nav');
    
    // Создаем контейнер для мобильного меню
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu-container';
    
    // Создаем список для мобильного меню
    const mobileMenuList = document.createElement('ul');
    
    // Добавляем все пункты из навигации хедера
    headerNavs.forEach(nav => {
        // Проверяем, что это навигация хедера, а не галереи
        const navItems = nav.querySelectorAll('li');
        navItems.forEach(item => {
            // Клонируем элемент и сохраняем все стили
            const clone = item.cloneNode(true);
            
            // Проверяем, что это ссылка (а не кнопка "Показать все")
            const link = clone.querySelector('a');
            if (link) {
                mobileMenuList.appendChild(clone);
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
            .header__items > nav:first-of-type,
            .header__items > nav:last-of-type {
                display: none !important;
            }
            
            /* Скрываем VK кнопку на мобильных */
            .header__img {
                display: none;
            }
            
            /* Центрируем логотип на мобильных */
            .header__logo {
                order: 1;
                margin: 0 auto;
                width: 80px;
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
    menuToggle.addEventListener('click', function() {
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
        
        if (!mobileMenu || !menuToggle) return;
        
        // Если клик вне меню и кнопки меню
        if (!mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target) && 
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
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
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
});

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

// Добавляем стили для активных кнопок фильтрации (чтобы не терять ваш стиль)
const style = document.createElement('style');
style.textContent = `
    /* Стиль для активной кнопки фильтрации */
    .main-links button.active {
        color: #856A65 !important;
        text-decoration: underline !important;
        text-decoration-color: #CDAA7D !important;
    }
    
    /* Добавляем активный класс кнопкам фильтрации */
    .main-links button.active {
        font-family: 'Cormorant Garamond';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 130%;
        color: #856A65 !important;
        text-decoration: underline;
        text-decoration-color: #CDAA7D;
    }
    
    /* Улучшаем адаптивность галереи */
    @media (max-width: 768px) {
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
`;
document.head.appendChild(style);
