// js/main.js
import { fetchServices } from './api.js';
import { renderServices, openModal, closeModal } from './ui.js';
import { navSetup } from './nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  navSetup();

  // modal close wiring
  const backdrop = document.getElementById('modal-backdrop');
  backdrop && backdrop.addEventListener('click', (e)=> {
    if (e.target === backdrop) closeModal();
  });
  const closeBtn = document.querySelector('.modal .close');
  closeBtn && closeBtn.addEventListener('click', closeModal);

  // if services container present -> load data and render
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer){
    try {
      const services = await fetchServices('/data/services.json');
      // ensure we have at least 15 -> requirement satisfied by services.json
      renderServices(servicesContainer, services);
    } catch (err){
      servicesContainer.textContent = 'Could not load services. Please try again later.';
    }
  }
});
