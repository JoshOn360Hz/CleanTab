document.addEventListener('DOMContentLoaded', () => {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherCondition = document.getElementById('weather-condition');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const searchBar = document.getElementById('search-bar');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const saveShortcutBtn = document.getElementById('save-shortcut-btn');
    const apiKeyInput = document.getElementById('api-key');
    const cityInput = document.getElementById('city-input');
    const shortcutNameInput = document.getElementById('shortcut-name');
    const shortcutUrlInput = document.getElementById('shortcut-url');
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const shortcutsContainer = document.getElementById('shortcuts-container');
    
    let apiKey = localStorage.getItem('apiKey') || '';
    let city = localStorage.getItem('city') || 'London';
    // Retrieve the background image from localStorage (if exists)
    let backgroundImageUrl = localStorage.getItem('backgroundImage') || '';

// Set the background image if it exists
    if (backgroundImageUrl) {
    document.body.style.backgroundImage = backgroundImageUrl;
}


    let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];

    shortcutUrlInput.addEventListener('input', (e) => {
        let inputUrl = e.target.value.trim();

        if (inputUrl && !inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
            e.target.value = 'https://www.' + inputUrl;
        }
    });

    function displayShortcuts() {
        shortcutsContainer.innerHTML = ''; 
        shortcuts.forEach((shortcut, index) => {
            const shortcutCard = document.createElement('div');
            shortcutCard.classList.add('shortcut-card');
            
            const favicon = document.createElement('img');
            favicon.src = `https://www.google.com/s2/favicons?domain=${shortcut.url}`; 
            shortcutCard.appendChild(favicon);

            const shortcutName = document.createElement('span');
            shortcutName.textContent = shortcut.name;
            shortcutCard.appendChild(shortcutName);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeShortcut(index);
            });

            shortcutCard.addEventListener('click', () => {
                window.open(shortcut.url, '_blank'); 
            });

            shortcutCard.appendChild(removeButton);
            shortcutsContainer.appendChild(shortcutCard);
        });
    }

    function removeShortcut(index) {
        shortcuts.splice(index, 1); 
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts)); 
        displayShortcuts(); 
    }

    displayShortcuts();

    saveSettingsBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value;
        city = cityInput.value;
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('city', city);
        settingsModal.style.display = 'none';
        getWeatherData(city); 
    });

    saveShortcutBtn.addEventListener('click', () => {
        const shortcutName = shortcutNameInput.value.trim();
        const shortcutUrl = shortcutUrlInput.value.trim();

        if (shortcutName && shortcutUrl) {
            const newShortcut = { name: shortcutName, url: shortcutUrl };
            shortcuts.push(newShortcut);
            localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
            displayShortcuts(); 
            settingsModal.style.display = 'none';
        }
    });

    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        apiKeyInput.value = apiKey; 
        cityInput.value = city;    
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        window.location.reload();
    });

    async function getWeatherData(city = 'London') {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const weatherData = data.weather[0];
                const temp = data.main.temp;
                const icon = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`; 
                weatherIcon.src = icon;
                weatherCondition.textContent = weatherData.description;
                cityName.textContent = city;
                temperature.textContent = `${Math.round(temp)}°C`;
            } else {
                weatherCondition.textContent = 'Error fetching weather data';
            }
        } catch (error) {
            weatherCondition.textContent = 'Unable to fetch weather data';
            console.error(error);
        }
    }

    getWeatherData(city);

    uploadBtn.addEventListener('click', () => {
        fileInput.click();  
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const backgroundImageUrl = `url(${event.target.result})`;
                document.body.style.backgroundImage = backgroundImageUrl;

                localStorage.setItem('backgroundImage', backgroundImageUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchBar.value.trim();
            if (query) {
                if (query.includes('.com')) {
                    window.location.href = `https://${query}`;
                } else {
                    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                }
            }
        }
    });
});
