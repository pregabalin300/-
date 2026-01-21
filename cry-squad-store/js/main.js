// Основной JavaScript файл для магазина CrySquad

document.addEventListener('DOMContentLoaded', function() {
    console.log('CrySquad Store loaded');
    
    // Инициализация количества товаров в корзине
    updateCartCount();
    
    // Обработка кнопок "В корзину" на главной странице
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
            addToCart(productTitle);
        });
    });
    
    // Плавный скролл для ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками товаров
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
});

// Функция добавления в корзину
function addToCart(productName) {
    // В реальном приложении здесь был бы запрос к бэкенду
    console.log(`Добавлен товар: ${productName}`);
    
    // Обновляем счетчик корзины
    let currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    currentCount++;
    localStorage.setItem('cartCount', currentCount);
    
    updateCartCount();
    
    // Показываем уведомление
    showNotification(`Товар "${productName}" добавлен в корзину!`);
}

// Функция обновления счетчика корзины
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = parseInt(localStorage.getItem('cartCount') || '0');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        if (count === 0) {
            element.style.display = 'none';
        } else {
            element.style.display = 'flex';
        }
    });
}

// Функция показа уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle" style="color: var(--accent-color); margin-right: 10px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--secondary-bg);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: var(--border-radius);
        border-left: 4px solid var(--accent-color);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;
    
    // Анимация появления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Функция для поиска товаров (заглушка)
function searchProducts(query) {
    console.log(`Поиск товаров: ${query}`);
    // В реальном приложении здесь был бы AJAX-запрос
}