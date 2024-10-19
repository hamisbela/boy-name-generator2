let boyNames = [];
let currentName = '';

async function loadNames() {
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.style.display = 'block';
    try {
        const response = await fetch('boy_names.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header
        boyNames = rows
            .map(row => {
                const [name, first_letter] = row.split(',');
                if (name && first_letter) {
                    return { 
                        name: name.trim(), 
                        first_letter: first_letter.trim() 
                    };
                }
                return null;
            })
            .filter(Boolean); // Remove any null entries
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

function filterNames(search) {
    if (!search) return generateRandomNames(); // If search is empty, return random names
    return boyNames.filter(name => 
        name.name.toLowerCase().startsWith(search.toLowerCase()) ||
        name.first_letter.toLowerCase() === search.toLowerCase()
    );
}

function addToFavorites(name) {
    const favoritesList = document.getElementById('favorites-list');
    const listItem = document.createElement('li');
    listItem.textContent = name;
    favoritesList.appendChild(listItem);
}

const generateBtn = document.getElementById('generate-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const searchInput = document.getElementById('search-input');
const darkModeToggle = document.getElementById('dark-mode-toggle');

generateBtn.addEventListener('click', () => {
    console.log('Generate button clicked'); // Debugging
    const randomNames = generateRandomNames();
    updateNameDisplay(randomNames);
});

favoriteBtn.addEventListener('click', () => {
    if (currentName) {
        addToFavorites(currentName);
    }
});

searchInput.addEventListener('input', (e) => {
    const filteredNames = filterNames(e.target.value);
    updateNameDisplay(filteredNames);
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial load and generation of names
loadNames().then(() => {
    const initialNames = generateRandomNames();
    updateNameDisplay(initialNames);
});
