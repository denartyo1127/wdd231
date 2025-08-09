// --- Directory Page Specific JavaScript ---

const memberCardsContainer = document.getElementById('member-cards-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

const dataURL = 'data/members.json'; // Adjust path if your members.json is elsewhere
let allMembersData = []; // Store fetched data to avoid re-fetching

/**
 * Creates and returns an HTML element for a member, styled as either a card or list item.
 * @param {object} member - The member object from members.json.
 * @param {string} viewType - 'grid' or 'list'.
 * @returns {HTMLElement} The created div element.
 */
const createMemberElement = (member, viewType) => {
    const element = document.createElement('div');
    if (viewType === 'grid') {
        element.classList.add('member-card'); // CSS class for grid view
        element.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="150" onerror="this.onerror=null;this.src='https://placehold.co/150x150/A0A0A0/FFFFFF?text=Logo';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            <p class="membership-level">Membership: Level ${member.membershipLevel}</p>
            <p class="description">${member.description}</p>
        `;
    } else { // list view
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
    return element;
};

/**
 * Clears existing members and displays them based on the current view type.
 * @param {Array<object>} members - Array of member objects to display.
 */
const renderMembers = (members) => {
    if (!memberCardsContainer) return; // Exit if container doesn't exist

    memberCardsContainer.innerHTML = ''; // Clear previous content

    // Determine the current view type from the container's classes
    const currentView = memberCardsContainer.classList.contains('grid-view') ? 'grid' : 'list';

    members.forEach(member => {
        const memberElement = createMemberElement(member, currentView);
        memberCardsContainer.appendChild(memberElement);
    });
};

/**
 * Fetches members data from the JSON file.
 * Stores the data and then renders it.
 */
async function getAndStoreMemberData() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allMembersData = await response.json(); // Store the fetched data
        renderMembers(allMembersData); // Initial render
    } catch (error) {
        console.error('Could not fetch members:', error);
        if (memberCardsContainer) {
            memberCardsContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
        }
    }
}

// Event Listeners for view toggles
if (gridViewBtn && listViewBtn && memberCardsContainer) { // Ensure elements exist
    gridViewBtn.addEventListener('click', () => {
        memberCardsContainer.classList.add('grid-view');
        memberCardsContainer.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        renderMembers(allMembersData); // Re-render with stored data
    });

    listViewBtn.addEventListener('click', () => {
        memberCardsContainer.classList.add('list-view');
        memberCardsContainer.classList.remove('grid-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        renderMembers(allMembersData); // Re-render with stored data
    });

    // Initial load of members (default to grid view as per HTML)
    document.addEventListener('DOMContentLoaded', () => {
        getAndStoreMemberData(); // Fetch and store data on initial load
    });
}
