// Update footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Last visit tracking
const lastVisitMessage = document.getElementById('lastVisitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (lastVisit) {
  const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysSince === 0) {
    lastVisitMessage.textContent = "Welcome back! You last visited today.";
  } else if (daysSince === 1) {
    lastVisitMessage.textContent = "Welcome back! You visited 1 day ago.";
  } else {
    lastVisitMessage.textContent = `Welcome back! You visited ${daysSince} days ago.`;
  }
} else {
  lastVisitMessage.textContent = "Welcome! This is your first visit.";
}

localStorage.setItem('lastVisit', now);

// Load JSON data
fetch('data/items.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    data.forEach(item => {
      const card = document.createElement('article');
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));
