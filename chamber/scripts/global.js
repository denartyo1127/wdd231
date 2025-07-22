document.addEventListener('DOMContentLoaded', () => {
    // Get current year for the footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'currentyear' not found.");
    }

    // Get the last modification date of the document
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    } else {
        console.warn("Element with ID 'lastModified' not found.");
    }

    // JavaScript for hamburger menu toggle
    const menuButton = document.getElementById('hamburger-menu');
    const primaryNav = document.getElementById('primary-nav');

    if (menuButton && primaryNav) { 
        menuButton.addEventListener('click', () => {
            primaryNav.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    } else {
        console.warn("Hamburger menu button or primary navigation not found.");
    }
});