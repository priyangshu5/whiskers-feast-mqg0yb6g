document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    const nav = document.querySelector('header nav');
    const navUl = document.querySelector('header nav ul');

    if (nav && navUl) {
        const toggle = document.createElement('button');
        toggle.classList.add('nav-toggle');
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '&#9776;';

        nav.insertBefore(toggle, navUl);

        toggle.addEventListener('click', function () {
            const isOpen = navUl.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });

        navUl.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                navUl.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '&#9776;';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll(
        'section, .product-card, blockquote, .form-group'
    );

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(function (el) {
            el.classList.add('reveal-hidden');
            revealObserver.observe(el);
        });

        const style = document.createElement('style');
        style.textContent =
            '.reveal-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; } .revealed { opacity: 1; transform: translateY(0); }';
        document.head.appendChild(style);
    }

    // Current year in footer
    const footer = document.getElementById('footer');
    if (footer) {
        const p = footer.querySelector('p');
        if (p) {
            p.innerHTML = p.innerHTML.replace(/\d{4}/, new Date().getFullYear());
        }
    }

    // Form handling
    const form = document.querySelector('#contact form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (nameInput && emailInput && messageInput && form.checkValidity()) {
                const button = form.querySelector('button[type="submit"]');
                if (button) {
                    button.textContent = 'Message Sent!';
                    button.disabled = true;
                    button.style.opacity = '0.7';
                }

                setTimeout(function () {
                    form.reset();
                    if (button) {
                        button.textContent = 'Send Message';
                        button.disabled = false;
                        button.style.opacity = '1';
                    }
                }, 3000);
            } else {
                form.reportValidity();
            }
        });
    }

    // Shrink header on scroll
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }
});