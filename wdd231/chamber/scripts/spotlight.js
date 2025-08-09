const spotlightGrid = document.getElementById('spotlight-grid');
const MEMBERS_DATA_URL = 'data/members.json'; // Path to your members.json file

/**
 * Fetches member data, filters for Gold/Silver, randomly selects 2-3,
 * and displays them in the spotlight section.
 */
async function loadMemberSpotlights() {
    if (!spotlightGrid) {
        console.warn("Spotlight grid element not found. Skipping member spotlights.");
        return;
    }

    try {
        const response = await fetch(MEMBERS_DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();

        // Filter for Gold or Silver members
        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );

        if (eligibleMembers.length === 0) {
            spotlightGrid.innerHTML = '<p>No Gold or Silver members available for spotlight.</p>';
            return;
        }

        // Randomly select 2-3 members
        const selectedSpotlights = [];
        const numToSelect = Math.min(3, eligibleMembers.length); // Select up to 3, or fewer if not enough
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random()); // Shuffle array

        for (let i = 0; i < numToSelect; i++) {
            selectedSpotlights.push(shuffledMembers[i]);
        }

        displaySpotlights(selectedSpotlights);

    } catch (error) {
        console.error('Error loading member spotlights:', error);
        spotlightGrid.innerHTML = '<p>Failed to load member spotlights. Please try again later.</p>';
    }
}

/**
 * Displays the selected member spotlights in the grid.
 * @param {Array<object>} spotlights - Array of member objects to display.
 */
function displaySpotlights(spotlights) {
    if (!spotlightGrid) return; // Exit if element doesn't exist

    spotlightGrid.innerHTML = ''; // Clear existing content

    spotlights.forEach(member => {
        const spotlightCard = document.createElement('article');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100" onerror="this.onerror=null;this.src='https://placehold.co/100x100/A0A0A0/FFFFFF?text=Logo';">
            <h4>${member.name}</h4>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank" class="learn-more">Visit Website</a>
        `;
        spotlightGrid.appendChild(spotlightCard);
    });
}

// Call the function to load spotlights when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadMemberSpotlights);