// Get current year for the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modification date of the document
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// JavaScript for hamburger menu toggle
const menuButton = document.getElementById('hamburger-menu');
const primaryNav = document.getElementById('primary-nav');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuButton.classList.toggle('open'); // Optional: style button when open
});

// --- Directory Page Specific JavaScript ---

const memberCardsContainer = document.getElementById('member-cards-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

const dataURL = 'data/members.json'; // Adjust path if your members.json is elsewhere

// Function to create and display a member card/list item
const displayMember = (member, viewType) => {
    let element;

    if (viewType === 'grid') {
        element = document.createElement('div');
        element.classList.add('member-card'); // CSS class for grid view

        element.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            <p class="membership-level">Membership: Level ${member.membershipLevel}</p>
            <p class="description">${member.description}</p>
        `;
    } else { // list view
        element = document.createElement('div'); // Using div for flexibility, could be li
        element.classList.add('member-list-item'); // CSS class for list view

        element.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            <p><strong>Membership:</strong> Level ${member.membershipLevel}</p>
            <p><strong>Description:</strong> ${member.description}</p>
        `;
    }
    memberCardsContainer.appendChild(element);
};

// Function to fetch members data and display them
async function getMemberData() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Store data globally or pass it to display function
        displayMembers(data);
    } catch (error) {
        console.error('Could not fetch members:', error);
        memberCardsContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

// Function to clear existing members and display based on current view
const displayMembers = (members) => {
    memberCardsContainer.innerHTML = ''; // Clear previous content

    let currentView = memberCardsContainer.classList.contains('grid-view') ? 'grid' : 'list';

    members.forEach(member => {
        displayMember(member, currentView);
    });
};

// Event Listeners for view toggles
gridViewBtn.addEventListener('click', () => {
    memberCardsContainer.classList.add('grid-view');
    memberCardsContainer.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    // Re-display members with grid view if data is already loaded
    getMemberData(); // Refetch or store data and re-render
});

listViewBtn.addEventListener('click', () => {
    memberCardsContainer.classList.add('list-view');
    memberCardsContainer.classList.remove('grid-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    // Re-display members with list view if data is already loaded
    getMemberData(); // Refetch or store data and re-render
});

// Initial load of members (default to grid view as per HTML)
document.addEventListener('DOMContentLoaded', () => {
    getMemberData();
});
