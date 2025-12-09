// ============ МОБИЛЬНОЕ МЕНЮ ============
const hamburger = document.getElementById('hamburger');
const body = document.getElementById('body');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        body.classList.toggle('nav-active');
    });
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        body.classList.remove('nav-active');
    });
});

// Закрытие меню при клике вне меню
document.addEventListener('click', (event) => {
    const isClickInsideMenu = document.querySelector('.header__items').contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && body.classList.contains('nav-active')) {
        body.classList.remove('nav-active');
    }
});

// ============ ФИЛЬТРАЦИЯ РАБОТ ============
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
    elem1.style.display = "inline-block";
    elem2.style.display = "inline-block";
    elem3.style.display = "inline-block";
    elem4.style.display = "inline-block";
    elem5.style.display = "inline-block";
    elem6.style.display = "inline-block";
    elem7.style.display = "inline-block";
    elem8.style.display = "inline-block";
    elem9.style.display = "inline-block";
}

// Стилизация активной кнопки фильтра
function setActiveButton(activeBtn) {
    [btn1, btn2, btn3, btn4].forEach(btn => {
        if (btn === activeBtn) {
            btn.style.color = '#856A65';
            btn.style.textDecoration = 'underline';
            btn.style.textDecorationColor = '#CDAA7D';
        } else {
            btn.style.color = '#B7B3B3';
            btn.style.textDecoration = 'none';
        }
    });
}

btn1.onclick = function() {
    New();
    setActiveButton(btn1);
}

btn2.onclick = function() {
    New();
    elem1.style.display = "none";
    elem2.style.display = "none";
    elem3.style.display = "none";
    elem4.style.display = "none";
    elem5.style.display = "none";
    elem6.style.display = "none";
    elem8.style.display = "none";
    elem9.style.display = "none";
    setActiveButton(btn2);
}

btn3.onclick = function() {
    New();
    elem1.style.display = "none";
    elem2.style.display = "none";
    elem5.style.display = "none";
    elem6.style.display = "none";
    elem7.style.display = "none";
    elem8.style.display = "none";
    elem9.style.display = "none";
    setActiveButton(btn3);
}

btn4.onclick = function() {
    New();
    elem1.style.display = "none";
    elem3.style.display = "none";
    elem4.style.display = "none";
    elem7.style.display = "none";
    setActiveButton(btn4);
}

// Инициализация активной кнопки при загрузке
window.addEventListener('DOMContentLoaded', () => {
    setActiveButton(btn1);
});

// Адаптация фильтра для мобильных устройств
window.addEventListener('resize', () => {
    // Если мы на мобильном устройстве, изменяем отображение работ
    if (window.innerWidth <= 768) {
        // Для мобильных устройств переключаем display на block
        const workItems = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
        workItems.forEach(item => {
            if (item.style.display === 'inline-block') {
                item.style.display = 'block';
            }
        });
    } else {
        // Для десктопа возвращаем inline-block
        const workItems = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
        workItems.forEach(item => {
            if (item.style.display === 'block') {
                item.style.display = 'inline-block';
            }
        });
    }
});

// Закрытие формы записи при клике вне формы
const form = document.querySelector('.form');
document.addEventListener('click', (event) => {
    if (form && form.style.display === 'block') {
        if (!form.contains(event.target) && !event.target.closest('a[href*="Online"]')) {
            form.style.display = 'none';
        }
    }
});
