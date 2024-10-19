const boyNames = [
    "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Henry", "Alexander",
    "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan", "Jackson", "Sebastian", "Jack", "Aiden",
    "Owen", "Samuel", "Matthew", "Joseph", "Levi", "Mateo", "David", "John", "Wyatt", "Carter"
];

const nameMeanings = {
    "Liam": "Resolute protection",
    "Noah": "Rest, comfort",
    "Oliver": "Olive tree",
    // Add meanings for all names...
};

const nameDisplay = document.getElementById('name-display');
const nameMeaning = document.getElementById('name-meaning');
const generateBtn = document.getElementById('generate-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let currentName = '';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function generateRandomName() {
    const randomIndex = Math.floor(Math.random() * boyNames.length);
    return boyNames[randomIndex];
}

function updateNameDisplay(name) {
    currentName = name;
    nameDisplay.textContent = name;
    nameMeaning.textContent = nameMeanings[name] || "Meaning not available";
}

function addToFavorites(name) {
    if (!favorites.includes(name)) {
        favorites.push(name);
        updateFavoritesList();
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        favoritesList.appendChild(li);
    });
}

function filterNames(search) {
    return boyNames.filter(name => name.toLowerCase().includes(search.toLowerCase()));
}

generateBtn.addEventListener('click', () => {
    const randomName = generateRandomName();
    updateNameDisplay(randomName);
});

favoriteBtn.addEventListener('click', () => {
    if (currentName) {
        addToFavorites(currentName);
    }
});

searchInput.addEventListener('input', (e) => {
    const filteredNames = filterNames(e.target.value);
    if (filteredNames.length > 0) {
        updateNameDisplay(filteredNames[0]);
    } else {
        nameDisplay.textContent = "No matching names";
        nameMeaning.textContent = "";
    }
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

updateFavoritesList();
