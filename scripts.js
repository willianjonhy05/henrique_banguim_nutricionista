document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // 1. MENU MOBILE (VERSÃO FINAL)
    // ================================
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuIcon && navLinks) {

        function openMenu() {
            navLinks.classList.add('active');
            mobileMenuIcon.classList.add('toggle');
            document.body.classList.add('menu-open');
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.remove('toggle');
            document.body.classList.remove('menu-open');
        }

        function toggleMenu(e) {
            e.stopPropagation();
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        }

        // BOTÃO HAMBÚRGUER (abre/fecha)
        mobileMenuIcon.addEventListener('click', toggleMenu);

        // BOTÃO X (fecha)
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }

        // LINKS DO MENU (fecha ao clicar)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // CLIQUE FORA DO MENU (fecha)
        document.addEventListener('click', (e) => {
            if (!navLinks.classList.contains('active')) return;

            const clickedInsideMenu = navLinks.contains(e.target);
            const clickedOnButton = mobileMenuIcon.contains(e.target);

            if (!clickedInsideMenu && !clickedOnButton) {
                closeMenu();
            }
        });

        // SCROLL (fecha automaticamente)
        window.addEventListener('scroll', closeMenu);

        // TECLA ESC (fecha)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    // ================================
    // 2. SCROLL REVEAL (ANIMAÇÕES)
    // ================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ================================
    // 3. HEADER DINÂMICO
    // ================================
    function handleHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        const scrolled = window.scrollY > 50;

        header.style.padding = scrolled ? '10px 0' : '20px 0';
        header.style.boxShadow = scrolled
            ? '0 5px 20px rgba(0,0,0,0.1)'
            : 'none';
    }

    window.addEventListener('scroll', handleHeader);

    // ================================
    // 4. ANO AUTOMÁTICO
    // ================================
    const anoEl = document.getElementById("ano-atual");
    if (anoEl) {
        anoEl.textContent = new Date().getFullYear();
    }

});



