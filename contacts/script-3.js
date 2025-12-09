// =====================
// МОБИЛЬНОЕ МЕНЮ ДЛЯ СТРАНИЦЫ КОНТАКТОВ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        // Переключаем класс для хедера
        const headerItems = document.querySelector('.header__items');
        if (headerItems) {
            headerItems.classList.toggle('mobile-menu-active');
        }
        
        // Переключаем класс для body для блокировки прокрутки
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // Закрытие меню при клике на ссылку
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && document.body.classList.contains('mobile-menu-open')) {
            document.querySelector('.header__items').classList.remove('mobile-menu-active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Закрытие меню на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
            document.querySelector('.header__items').classList.remove('mobile-menu-active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Адаптация карты при изменении размера окна
    function adaptMapForMobile() {
        const mapIframe = document.querySelector('.map iframe');
        if (!mapIframe) return;
        
        if (window.innerWidth <= 768) {
            mapIframe.style.height = '350px';
        } else if (window.innerWidth <= 1024) {
            mapIframe.style.height = '500px';
        } else {
            mapIframe.style.height = '576px';
        }
    }
    
    // Запускаем адаптацию при загрузке и изменении размера окна
    adaptMapForMobile();
    window.addEventListener('resize', adaptMapForMobile);
});
