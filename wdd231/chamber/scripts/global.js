document.addEventListener('DOMContentLoaded', () => {
    // Footer year / last modified
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'currentyear' not found.");
    }

    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    } else {
        console.warn("Element with ID 'lastModified' not found.");
    }

    // Hamburger menu toggle with aria-expanded
    const menuButton = document.getElementById('hamburger-menu');
    const primaryNav = document.getElementById('primary-nav');

    if (menuButton && primaryNav) {
        menuButton.setAttribute('aria-expanded', 'false');

        menuButton.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            menuButton.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    } else {
        console.warn("Hamburger menu button or primary navigation not found.");
    }

    // automatic wayfinding: highlight current page link
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
});


