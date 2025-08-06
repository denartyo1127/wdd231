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
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });

    // --- 3. Modal Functionality with Accessibility Enhancements ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');

    let activeModal = null;
    let lastFocusedTrigger = null;

    function getFocusableElements(container) {
        return Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => el.offsetParent !== null);
    }

    function trapFocus(modal) {
        const focusable = getFocusableElements(modal);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function handleKeydown(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        }

        modal.addEventListener('keydown', handleKeydown);
        modal._removeTrap = () => {
            modal.removeEventListener('keydown', handleKeydown);
            delete modal._removeTrap;
        };
    }

    function openModal(modalId, triggerButton) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        lastFocusedTrigger = triggerButton || document.activeElement;

        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        const focusable = getFocusableElements(modal);
        if (focusable.length) {
            focusable[0].focus();
        }

        activeModal = modal;
        trapFocus(modal);
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        if (modal._removeTrap) modal._removeTrap();

        activeModal = null;
        document.body.style.overflow = '';

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            lastFocusedTrigger.focus();
        }
    }

    // Event listeners for triggers
    modalTriggers.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalId = event.currentTarget.dataset.modal;
            if (!modalId) return;
            openModal(modalId, event.currentTarget);
        });
    });

    // Close buttons
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        // backdrop click
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Escape key closes active modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });
});
