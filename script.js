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
        
        // Создаем мобильное меню, которое будет содержать все пункты
        createMobileMenu();
    } else if (mobileMenuToggle && !document.querySelector('.mobile-menu-container')) {
        // Если кнопка уже существует, но меню не создано
        createMobileMenu();
    }
}

// Создание мобильного меню со всеми пунктами
function createMobileMenu() {
    // Проверяем, не создано ли уже мобильное меню
    if (document.querySelector('.mobile-menu-container')) return;
    
    // Собираем все ссылки из обеих навигаций
    const leftNavItems = document.querySelectorAll('nav:first-of-type li');
    const rightNavItems = document.querySelectorAll('nav:last-of-type li');
    
    // Создаем контейнер для мобильного меню
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu-container';
    
    // Создаем список для мобильного меню
    const mobileMenuList = document.createElement('ul');
    
    // Добавляем все пункты из левой навигации
    leftNavItems.forEach(item => {
        const clone = item.cloneNode(true);
        mobileMenuList.appendChild(clone);
    });
    
    // Добавляем все пункты из правой навигации
    rightNavItems.forEach(item => {
        const clone = item.cloneNode(true);
        mobileMenuList.appendChild(clone);
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
        
        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        }
        
        .menu-toggle span {
            width: 25px;
            height: 3px;
            background-color: #856A65;
            margin: 3px 0;
            transition: 0.4s;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
                order: 2;
                margin-left: auto;
            }
            
            nav:first-of-type,
            nav:last-of-type {
                display: none !important;
            }
            
            .header__img {
                display: none;
            }
            
            .header__logo {
                order: 1;
                margin: 0 auto;
                width: 80px;
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
    const mobileLinks = document.querySelectorAll('.mobile-menu-container a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                body.classList.remove('mobile-menu-active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
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
// ФИЛЬТРАЦИЯ ГАЛЕРЕИ
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

function New(){
    // Сбрасываем все элементы к видимому состоянию
    const elements = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
    elements.forEach(elem => {
        if (elem) elem.style.display = "inline-block";
    });
    
    // Сбрасываем активные кнопки
    const buttons = [btn1, btn2, btn3, btn4];
    buttons.forEach(btn => {
        if (btn) btn.classList.remove('active');
    });
}

// Активируем кнопку и добавляем стиль
function activateButton(button) {
    // Сначала сбрасываем все
    New();
    // Затем активируем текущую кнопку
    if (button) button.classList.add('active');
}

btn1.onclick = function() {
    activateButton(this);
}

btn2.onclick = function() {
    activateButton(this);
    if (elem1) elem1.style.display = "none";
    if (elem2) elem2.style.display = "none";
    if (elem3) elem3.style.display = "none";
    if (elem4) elem4.style.display = "none";
    if (elem5) elem5.style.display = "none";
    if (elem6) elem6.style.display = "none";
    if (elem8) elem8.style.display = "none";
    if (elem9) elem9.style.display = "none";
}

btn3.onclick = function() {
    activateButton(this);
    if (elem1) elem1.style.display = "none";
    if (elem2) elem2.style.display = "none";
    if (elem5) elem5.style.display = "none";
    if (elem6) elem6.style.display = "none";
    if (elem7) elem7.style.display = "none";
    if (elem8) elem8.style.display = "none";
    if (elem9) elem9.style.display = "none";
}

btn4.onclick = function() {
    activateButton(this);
    if (elem1) elem1.style.display = "none";
    if (elem3) elem3.style.display = "none";
    if (elem4) elem4.style.display = "none";
    if (elem7) elem7.style.display = "none";
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
// АДАПТАЦИЯ ИЗОБРАЖЕНИЙ
// =====================

function adaptImages() {
    const mainImage = document.querySelector('.main-1 img');
    if (mainImage && window.innerWidth <= 768) {
        mainImage.style.height = 'auto';
    }
}

// =====================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем мобильное меню
    initMobileMenu();
    setupMobileMenu();
    
    // Адаптируем изображения
    adaptImages();
    
    // Инициализируем галерею (делаем все видимыми по умолчанию)
    if (btn1) {
        btn1.classList.add('active');
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    adaptImages();
    
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

// Добавляем стили для активных кнопок фильтрации
const style = document.createElement('style');
style.textContent = `
    .main-links button.active {
        color: #856A65 !important;
        text-decoration: underline !important;
        text-decoration-color: #CDAA7D !important;
    }
    
    /* Анимация для кнопок фильтрации */
    .main-links button {
        transition: all 0.3s ease;
    }
    
    /* Адаптивные стили для мобильных */
    @media (max-width: 768px) {
        .main-4 .container div {
            width: 100% !important;
            margin-right: 0 !important;
        }
        
        .main-4 .container img {
            margin-right: 0 !important;
            width: 100% !important;
        }
        
        .main-links {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            padding-bottom: 10px;
        }
        
        .main-links ul {
            display: flex;
            flex-wrap: nowrap;
        }
        
        .main-links li {
            margin-right: 15px !important;
            flex-shrink: 0;
        }
    }
`;
document.head.appendChild(style);
