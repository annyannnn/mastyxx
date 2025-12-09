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
        
        // Инициализируем обработчики событий для новой кнопки
        setupMobileMenu();
    } else if (mobileMenuToggle) {
        // Если кнопка уже существует, просто инициализируем обработчики
        setupMobileMenu();
    }
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
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
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
    
    // Адаптируем изображения
    adaptImages();
    
    // Инициализируем галерею (делаем все видимыми по умолчанию)
    if (btn1) {
        btn1.classList.add('active');
    }
    
    // Проверяем, есть ли все элементы галереи
    const galleryElements = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
    const missingElements = galleryElements.filter(elem => !elem);
    if (missingElements.length > 0) {
        console.log('Некоторые элементы галереи не найдены');
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

// =====================
// ПЛАВНАЯ ПРОКРУТКА
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// ОБРАБОТКА ФОРМЫ
// =====================

const bookingForm = document.querySelector('.form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = this.querySelector('input[name="your-name"]').value;
        const phone = this.querySelector('input[name="your-phone"]').value;
        const service = this.querySelector('select[name="guests"]').value;
        const time = this.querySelector('select[name="attending"]').value;
        
        // Простая валидация
        if (!name || !phone) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Данные формы:', { name, phone, service, time });
        
        // Показываем сообщение об успехе
        alert('Спасибо! Ваша запись принята. Мы свяжемся с вами для подтверждения.');
        
        // Сбрасываем форму
        this.reset();
        
        // Скрываем форму
        this.style.display = 'none';
    });
}

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
