const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const numberindicator = document.querySelector('.numbers');
const dotsContainer = document.getElementById('dots-container');

let active = 0;
const totalItems = items.length;
let timer;

// Gerar dots dinamicamente
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function update(direction) {
    const currentItem = document.querySelector('.item.active');
    const currentDot = document.querySelector('.dot.active');

    if (currentItem) currentItem.classList.remove('active');
    if (currentDot) currentDot.classList.remove('active');

    if (direction > 0) {
        active = (active + 1) % totalItems;
    } else if (direction < 0) {
        active = (active - 1 + totalItems) % totalItems;
    }

    items[active].classList.add('active');
    
    const dots = document.querySelectorAll('.dot');
    dots[active].classList.add('active');

    numberindicator.textContent = String(active + 1).padStart(2, '0');

    clearInterval(timer);
    timer = setInterval(() => {
        update(1);
    }, 5000);
}

function goToSlide(index) {
    const currentItem = document.querySelector('.item.active');
    const currentDot = document.querySelector('.dot.active');

    if (currentItem) currentItem.classList.remove('active');
    if (currentDot) currentDot.classList.remove('active');

    active = index;
    items[active].classList.add('active');
    
    const dots = document.querySelectorAll('.dot');
    dots[active].classList.add('active');

    numberindicator.textContent = String(active + 1).padStart(2, '0');

    clearInterval(timer);
    timer = setInterval(() => {
        update(1);
    }, 5000);
}

// Inicialização
if (prevButton && nextButton && items.length > 0) {
    createDots();
    
    prevButton.addEventListener('click', () => {
        update(-1);
    });

    nextButton.addEventListener('click', () => {
        update(1);
    });

    // Iniciar auto-play
    timer = setInterval(() => {
        update(1);
    }, 5000);
}

// Manipulador para formulário de contatos
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Formulário enviado:', data);
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// === Abrir WhatsApp ao clicar em botões de produto (index e produtos) ===
// DESABILITADO: Os botões agora funcionam diretamente via href no HTML
/*
function attachWhatsAppHandlers() {
    // botões dentro de .item (home carousel) e .product-card (produtos page)
    const productButtons = document.querySelectorAll('.item .btn, .product-card .btn');
    productButtons.forEach(btn => {
        // determinar nome do produto
        let productName = '';
        const item = btn.closest('.item');
        const card = btn.closest('.product-card');
        if (item) {
            const nameEl = item.querySelector('.product-name');
            if (nameEl) productName = nameEl.textContent.trim();
        } else if (card) {
            const nameEl = card.querySelector('h3');
            if (nameEl) productName = nameEl.textContent.trim();
        }

        if (!productName) productName = 'produto';

        // montar link do WhatsApp e garantir que o próprio link funcione mesmo sem JS
        const text = encodeURIComponent(`Olá Suziane, tenho interesse no produto: ${productName}. Você pode me passar mais informações?`);
        const wa = `https://wa.me/556293290519?text=${text}`;
        // definir href e target para âncoras
       
    });
}
*/

// attachWhatsAppHandlers(); // DESABILITADO

// Se estivermos na página de contatos e houver um parâmetro "product" na URL,
// preenche a mensagem do formulário e ajusta o link do WhatsApp para abrir com texto pré-formatado.
(function handleIncomingProduct() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productParam = urlParams.get('product');
        if (!productParam) return;

        const productName = decodeURIComponent(productParam);

        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.value = `Olá Suziane, tenho interesse no produto: ${productName}. Gostaria de mais informações.`;
            messageEl.focus();
        }

        const waLink = document.getElementById('waContact');
        if (waLink) {
            const text = encodeURIComponent(`Olá Suziane, tenho interesse no produto: ${productName}.`);
            waLink.href = `https://wa.me/556293290519?text=${text}`;
        }

      
        const contactFormEl = document.getElementById('contact-form');
        if (contactFormEl) {
            setTimeout(() => contactFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
        }
    } catch (err) {
        console.error('Erro ao aplicar parâmetro product na página de contatos:', err);
    }
})();


const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}