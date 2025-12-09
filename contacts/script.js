// =====================
// МОБИЛЬНОЕ МЕНЮ
// =====================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerItems = document.querySelector('.header__items');
    
    if (!menuToggle || !headerItems) return;
    
    // Обработчик клика на гамбургер
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        headerItems.classList.toggle('mobile-menu-active');
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // Закрытие меню при клике на ссылку
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && headerItems.classList.contains('mobile-menu-active')) {
            menuToggle.classList.remove('active');
            headerItems.classList.remove('mobile-menu-active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(e) {
        if (!headerItems.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            headerItems.classList.contains('mobile-menu-active')) {
            
            menuToggle.classList.remove('active');
            headerItems.classList.remove('mobile-menu-active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Закрытие меню на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && headerItems.classList.contains('mobile-menu-active')) {
            menuToggle.classList.remove('active');
            headerItems.classList.remove('mobile-menu-active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
    
    // Адаптация карты на странице контактов
    function adaptMapForMobile() {
        const mapIframe = document.querySelector('.map-container iframe');
        if (!mapIframe) return;
        
        if (window.innerWidth <= 768) {
            mapIframe.style.height = '350px';
        } else if (window.innerWidth <= 1024) {
            mapIframe.style.height = '450px';
        } else {
            mapIframe.style.height = '576px';
        }
    }
    
    // Инициализация адаптации карты
    if (document.querySelector('.map-container iframe')) {
        adaptMapForMobile();
        window.addEventListener('resize', adaptMapForMobile);
    }
});
