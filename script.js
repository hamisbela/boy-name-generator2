let boyNames = [];
let currentName = '';

async function loadNames() {
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.style.display = 'block';
    try {
        const response = await fetch('boy_names.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header
        boyNames = rows.map(row => {
            const [name, first_letter] = row.split(',');
            return { name: name.trim(), first_letter: first_letter.trim() };
        });
        console.log('Names loaded:', boyNames.length); // Debugging
    } catch (error) {
        console.error('Error loading names:', error);
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function generateRandomNames(count = 10) {
    console.log('Generating random names...'); // Debugging
    if (boyNames.length === 0) {
        console.log('No names available'); // Debugging
        return [];
    }
    const shuffled = [...boyNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function updateNameDisplay(names) {
    console.log('Updating name display:', names); // Debugging
    const nameList = document.getElementById('name-list');
    const firstLetter = document.getElementById('first-letter');
    nameList.innerHTML = ''; // Clear previous names
    if (names.length === 0) {
        nameList.innerHTML = "<li>No names available</li>";
        firstLetter.textContent = "";
        return;
    }
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name.name;
        nameList.appendChild(li);
    });
    firstLetter.textContent = `First letter of first name: ${names[0].first_letter}`;
    currentName = names[0].name;
}

generateBtn.addEventListener('click', () => {
    const randomNames = generateRandomNames();
    updateNameDisplay(randomNames);
});

// Load names when the page loads
loadNames().then(() => {
    console.log('Names loaded, ready to generate'); // Debugging
});

function filterNames(search) {
    return boyNames.filter(name => 
        name.name.toLowerCase().includes(search.toLowerCase()) ||
        name.first_letter.toLowerCase() === search.toLowerCase()
    );
}

searchInput.addEventListener('input', (e) => {
    const filteredNames = filterNames(e.target.value);
    if (filteredNames.length > 0) {
        updateNameDisplay([filteredNames[0]]);
    } else {
        nameDisplay.textContent = "No matching names";
        firstLetter.textContent = "";
    }
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

updateFavoritesList();

const nameDisplay = document.getElementById('name-display');
const firstLetter = document.getElementById('first-letter');
const generateBtn = document.getElementById('generate-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const loadingMessage = document.getElementById('loading-message');
