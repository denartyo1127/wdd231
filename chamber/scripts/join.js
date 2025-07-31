document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Populate Hidden Timestamp Field ---
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        
        const now = new Date();
        timestampField.value = now.toISOString();
    } else {
        console.warn("Timestamp field with ID 'timestamp' not found on join.html.");
    }

    // --- 2. Animate Membership Cards on Load ---
    // Select all membership cards
    const membershipCards = document.querySelectorAll('.membership-card');
    
    
    membershipCards.forEach((card, index) => {

        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100); // Staggered animation: each card appears 100ms after the previous
    });

    // --- 3. Modal Functionality ---
    // Get all buttons that trigger modals
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    // Get all close buttons within the modals
    const closeButtons = document.querySelectorAll('.modal .close-button');
    // Get all modal elements
    const modals = document.querySelectorAll('.modal');

    // Function to open a specific modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Use flex to center the modal content
            modal.setAttribute('aria-hidden', 'false'); // For accessibility
        }
    }

    // Function to close a specific modal element
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        modalElement.setAttribute('aria-hidden', 'true'); // For accessibility
    }

    // Add event listeners to all modal trigger buttons
    modalTriggers.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get the ID of the modal to open from the data-modal attribute
            const modalId = event.target.dataset.modal;
            openModal(modalId);
        });
    });

    // Add event listeners to all modal close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Find the closest parent modal element and close it
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            
            modals.forEach(modal => {
                if (modal.style.display === 'flex') { 
                    closeModal(modal);
                }
            });
        }
    });

});