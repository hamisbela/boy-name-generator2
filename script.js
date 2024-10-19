let boyNames = [];

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
        populateLetterDropdown();
    } catch (error) {
        console.error('Error loading names:', error);
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function populateLetterDropdown() {
    const letterSelect = document.getElementById('letter-select');
    const letters = [...new Set(boyNames.map(name => name.first_letter))].sort();
    letters.forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        letterSelect.appendChild(option);
    });
}

function generateRandomNames(count = 10, startLetter = '') {
    let filteredNames = startLetter 
        ? boyNames.filter(name => name.first_letter === startLetter) 
        : boyNames;
    
    const shuffled = [...filteredNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function updateNameDisplay(names) {
    const nameList = document.getElementById('name-list');
    nameList.innerHTML = ''; // Clear previous names
    names.forEach(name => {
        const li = document.createElement('li');
        li.className = 'name-item';
        li.innerHTML = `
            ${name.name}
            <i class="fas fa-copy copy-icon" title="Copy to clipboard"></i>
        `;
        const copyIcon = li.querySelector('.copy-icon');
        copyIcon.addEventListener('click', () => copyToClipboard(name.name));
        nameList.appendChild(li);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Name copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

const generateBtn = document.getElementById('generate-btn');
const letterSelect = document.getElementById('letter-select');

generateBtn.addEventListener('click', () => {
    const selectedLetter = letterSelect.value;
    const randomNames = generateRandomNames(10, selectedLetter);
    updateNameDisplay(randomNames);
});

// Initial load and generation of names
loadNames().then(() => {
    const initialNames = generateRandomNames(10);
    updateNameDisplay(initialNames);
});
