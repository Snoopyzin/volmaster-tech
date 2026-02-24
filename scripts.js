/**
 * VOLMASTER TECH - SISTEMA DE CAROUSEL E INTERAÇÕES
 * Arquivo: scripts.js
 * Descrição: Controla o carousel da página inicial, formulário de contatos e outras interações
 * Versão: 4.0
 * Data: 24/02/2026
 */

// ============================================
// VARIÁVEIS GLOBAIS DO CAROUSEL
// ============================================
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const numberindicator = document.querySelector('.numbers');
const dotsContainer = document.getElementById('dots-container');

let active = 0;
const totalItems = items.length;
let timer;

// ============================================
// FUNÇÕES DO CAROUSEL
// ============================================

/**
 * Cria os indicadores (dots) dinamicamente baseado no número de slides
 */
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

/**
 * Atualiza o carousel quando usuário navega com setas
 * @param {number} direction - 1 para próximo, -1 para anterior
 */
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

/**
 * Navega diretamente para um slide específico quando usuário clica em um dot
 * @param {number} index - Índice do slide desejado (0 a totalItems-1)
 */
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

// ============================================
// INICIALIZAÇÃO DO CAROUSEL
// ============================================
// Só executa se os elementos necessários existirem na página
if (prevButton && nextButton && items.length > 0) {
    createDots();
    
    prevButton.addEventListener('click', () => {
        update(-1);
    });

    nextButton.addEventListener('click', () => {
        update(1);
    });

    // Auto-play: avança automaticamente a cada 5 segundos
    timer = setInterval(() => {
        update(1);
    }, 5000);
}

// ============================================
// FORMULÁRIO DE CONTATOS
// ============================================

/**
 * Manipula o envio do formulário de contato
 * Valida os dados e exibe mensagem de sucesso
 */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta dados do formulário
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Formulário enviado:', data);
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// ============================================
// INTEGRAÇÃO COM WHATSAPP (COMENTADO - Links diretos no HTML)
// ============================================
/**
 * NOTA: Os botões de WhatsApp agora funcionam diretamente via href no HTML
 * Este código está desabilitado mas mantido para referência futura
 */

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

        // montar link do WhatsApp e garantir que o próprio link funcione mesmo sem JS
        const text = encodeURIComponent(`Olá Suziane, tenho interesse no produto: ${productName}. Você pode me passar mais informações?`);
        const wa = `https://wa.me/556293290519?text=${text}`;
        // definir href e target para âncoras
        if (btn.tagName === 'A') {
            btn.href = wa;
            btn.target = '_blank';
        }
    });
}
*/

// attachWhatsAppHandlers(); // DESABILITADO

// ============================================
// PREENCHIMENTO AUTOMÁTICO DO FORMULÁRIO
// ============================================
/**
 * Se a URL contém parâmetro "product", preenche automaticamente
 * o formulário de contato com o nome do produto
 */

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
            messageEl.value = `Olá, gostaria de saber mais sobre o curso: ${productName}`;
        }

        // Rola suavemente até o formulário após 250ms
        const contactFormEl = document.getElementById('contact-form');
        if (contactFormEl) {
            setTimeout(() => contactFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
        }
    } catch (err) {
        console.error('Erro ao aplicar parâmetro product na página de contatos:', err);
    }
})();

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
/**
 * Exibe botão "Voltar ao Topo" quando usuário rola a página
 * e permite retornar ao início com um clique
 */

const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
    // Mostra botão ao rolar mais de 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });

    // Rola suavemente para o topo ao clicar
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// FIM DO ARQUIVO
// ============================================
/**
 * Desenvolvido por: Volmaster Tech
 * Contato: vendas.volmastertech@gmail.com
 * WhatsApp: +55 62 9329-0519
 */
