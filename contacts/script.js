// =====================
// script.js — ФИНАЛЬНАЯ ВЕРСИЯ (работает везде)
// =====================

// === 1. ВСТРАИВАЕМ МОБИЛЬНЫЕ СТИЛИ ===
const mobileCSS = `
    .mobile-header-wrapper{display:none;position:fixed;top:0;left:0;width:100%;height:70px;background:white;z-index:10000;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
    .mobile-header{display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 15px;position:relative}
    .mobile-header-logo{position:absolute;left:50%;transform:translateX(-50%);width:60px;height:auto}
    .mobile-menu-toggle{width:30px;height:30px;background:none;border:none;padding:0;cursor:pointer;display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:10001}
    .mobile-menu-toggle span{display:block;width:100%;height:3px;background:#856A65;margin:3px 0;transition:all .3s ease;border-radius:2px}
    .mobile-menu-toggle.active span:nth-child(1){transform:translateY(8px) rotate(45deg)}
    .mobile-menu-toggle.active span:nth-child(2){opacity:0;transform:scale(0)}
    .mobile-menu-toggle.active span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
    .mobile-nav-overlay{display:none;position:fixed;top:70px;left:0;width:100%;height:calc(100vh - 70px);background:white;z-index:9999;padding:20px;overflow-y:auto}
    .mobile-nav-overlay.active{display:block}
    .mobile-nav-list{list-style:none;padding:0;margin:0}
    .mobile-nav-list li{margin-bottom:15px;text-align:center}
    .mobile-nav-list a{display:block;padding:15px;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:18px;color:#856A65;text-decoration:none;border-bottom:1px solid rgba(133,106,101,.1);transition:.3s}
    .mobile-nav-list a:hover{color:#CDAA7D;background:rgba(205,170,125,.1)}
    body.mobile-menu-open{overflow:hidden}
    @media (max-width:768px){
        .mobile-header-wrapper{display:block !important}
        header{display:none !important}
        body{padding-top:70px}
    }
    @media (min-width:769px){
        .mobile-header-wrapper,.mobile-nav-overlay{display:none !important}
    }
    .main-links button.active{color:#856A65 !important;text-decoration:underline !important;text-decoration-color:#CDAA7D !important}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileCSS;
document.head.appendChild(styleSheet);

// === 2. СОЗДАНИЕ МОБИЛЬНОГО МЕНЮ (всегда, на каждой странице) ===
function createMobileMenu() {
    // Удаляем старое меню, если вдруг уже есть (на всякий случай)
    document.querySelectorAll('.mobile-header-wrapper, .mobile-nav-overlay').forEach(el => el.remove());

    // Мобильный хедер
    const headerHTML = `
        <div class="mobile-header">
            <img class="mobile-header-logo" src="../logo.svg" alt="Masty">
            <button class="mobile-menu-toggle" aria-label="Открыть меню">
                <span></span><span></span><span></span>
            </button>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'mobile-header-wrapper';
    wrapper.innerHTML = headerHTML;

    // Мобильное меню
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.innerHTML = `
        <ul class="mobile-nav-list">
            <li><a href="../index.html">Главная</a></li>
            <li><a href="../Masters/masters.html">Мастера</a></li>
            <li><a href="../price/price.html">Прайс</a></li>
            <li><a href="../stock/stock.html">Акции</a></li>
            <li><a href="../reviews1/reviews.html">Отзывы</a></li>
            <li><a href="../contacts/contacts.html">Контакты</a></li>
        </ul>
    `;

    document.body.insertBefore(wrapper, document.body.firstChild);
    document.body.appendChild(overlay);

    // Обработчики
    const toggleBtn = wrapper.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav-overlay');

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
    });

    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && toggleBtn.classList.contains('active')) {
            toggleBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggleBtn.classList.contains('active')) {
            toggleBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
}

// === 3. ФИЛЬТРАЦИЯ ГАЛЕРЕИ (только на главной) ===
const elem1 = document.getElementById('1');
const elem2 = document.getElementById('2');
const elem3 = document.getElementById('3');
const elem4 = document.getElementById('4');
const elem5 = document.getElementById('5');
const elem6 = document.getElementById('6');
const elem7 = document.getElementById('7');
const elem8 = document.getElementById('8');
const elem9 = document.getElementById('9');

const btn1 = document.querySelector("#all");
const btn2 = document.querySelector("#hair");
const btn3 = document.querySelector("#nails");
const btn4 = document.querySelector("#makeup");

function New() {
    [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9].forEach(el => {
        if (el) el.style.display = "inline-block";
    });
}

// Сброс активной кнопки
function resetActive() {
    [btn1, btn2, btn3, btn4].forEach(btn => {
        if (btn) btn.classList.remove('active');
    });
}

if (btn1) {
    btn1.onclick = () => { New(); resetActive(); btn1.classList.add('active'); };
}
if (btn2) {
    btn2.onclick = () => { 
        New(); 
        resetActive(); 
        btn2.classList.add('active');
        [elem1, elem2, elem3, elem4, elem5, elem6, elem8, elem9].forEach(el => el.style.display = "none");
        elem7.style.display = "inline-block";
    };
}
if (btn3) {
    btn3.onclick = () => { 
        New(); 
        resetActive(); 
        btn3.classList.add('active');
        [elem1, elem2, elem5, elem6, elem7, elem8, elem9].forEach(el => el.style.display = "none");
        [elem3, elem4].forEach(el => el.style.display = "inline-block");
    };
}
if (btn4) {
    btn4.onclick = () => { 
        New(); 
        resetActive(); 
        btn4.classList.add('active');
        [elem1, elem3, elem4, elem7].forEach(el => el.style.display = "none");
        [elem2, elem5, elem6, elem8, elem9].forEach(el => el.style.display = "inline-block");
    };
}

// === 4. ФОРМА ЗАПИСИ ===
function toggleForm() {
    const form = document.querySelector('.form');
    if (form) {
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }
}

document.addEventListener('click', function(e) {
    const form = document.querySelector('.form');
    if (form && form.style.display === 'block' && !form.contains(e.target) && !e.target.closest('a[href*="annyannn"]')) {
        form.style.display = 'none';
    }
});

// === 5. ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu(); // Главное — запускаем всегда!

    // Подсветка "Показать все" при загрузке (если есть галерея)
    if (btn1 && window.location.pathname.includes('index.html')) {
        btn1.classList.add('active');
    }
});
