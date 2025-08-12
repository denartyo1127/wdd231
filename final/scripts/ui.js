// js/ui.js
const favoritesKey = 'guevara_favorites';

// localStorage helpers
export function getFavorites(){
  try{
    const raw = localStorage.getItem(favoritesKey);
    return raw ? JSON.parse(raw) : [];
  } catch { return [];}
}
export function toggleFavorite(id){
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if(idx === -1) favs.push(id);
  else favs.splice(idx,1);
  localStorage.setItem(favoritesKey, JSON.stringify(favs));
  return favs;
}

// render services (expects array)
export function renderServices(container, services){
  // clear
  container.innerHTML = '';

  services.forEach(s => {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-thumb">
        <img src="${s.image}" alt="${s.name}" loading="lazy">
      </div>
      <div class="service-info">
        <h3>${s.name}</h3>
        <div class="service-meta">Price: ${s.price === 0 ? 'Contact for quote' : '$' + s.price.toFixed(2)} • ${s.duration}</div>
        <p>${s.short}</p>
      </div>
      <div>
        <button class="btn-outline view-btn" data-id="${s.id}">Details</button>
        <button class="fav-btn" data-id="${s.id}">${getFavorites().includes(s.id) ? '★ Favorited' : '☆ Favorite'}</button>
      </div>
    `;
    container.appendChild(card);
  });

  // wire controls (delegation)
  container.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.id);
      const item = services.find(x=>x.id===id);
      openModal(item);
    });
  });
  container.querySelectorAll('.fav-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.id);
      const newFavs = toggleFavorite(id);
      // update label
      e.currentTarget.textContent = newFavs.includes(id) ? '★ Favorited' : '☆ Favorite';
    });
  });
}

// modal (simple accessible modal)
let lastFocused;
export function openModal(item){
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-body').innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Price:</strong> ${item.price === 0 ? 'Contact for quote' : '$' + item.price.toFixed(2)}</p>
    <p><strong>Estimated:</strong> ${item.duration}</p>
    <p>${item.long}</p>
  `;
  backdrop.style.display = 'flex';
  lastFocused = document.activeElement;
  modal.setAttribute('tabindex', '-1');
  modal.focus();

  // trap focus (basic)
  document.addEventListener('keydown', handleKeyDown);
}

export function closeModal(){
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.style.display = 'none';
  document.removeEventListener('keydown', handleKeyDown);
  if (lastFocused) lastFocused.focus();
}
function handleKeyDown(e){
  if(e.key === 'Escape') closeModal();
}
