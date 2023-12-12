document.addEventListener('DOMContentLoaded', function () {
    // Attach the searchAnime function to the button click event
    document.querySelector('button').addEventListener('click', searchAnime);
});

function searchAnime() {
    console.log('searchAnime function called');
    const searchInput = document.getElementById('searchInput').value;
    console.log('Search Input:', searchInput);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('XHR request completed');
            console.log('Response Text:', this.responseText);
            try {
                const response = JSON.parse(this.responseText);
                displayResults(response);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    });

    // Update the API request URL with the user's search input and genres
    const genres = encodeURIComponent('Fantasy,Drama'); // Modify with your desired genres
    const apiKey = '98020da0damsh54235aa7406c9a5p189351jsn15be91790019'; // Replace with your new RapidAPI key
    const apiUrl = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchInput}&genres=${genres}&sortBy=ranking&sortOrder=asc`;
    xhr.open('GET', apiUrl);
    xhr.setRequestHeader('X-RapidAPI-Key', apiKey);
    xhr.setRequestHeader('X-RapidAPI-Host', 'anime-db.p.rapidapi.com');
    xhr.send();
}

function displayResults(data) {
    console.log('displayResults function called');
    console.log('Data:', data);

    const resultContainer = document.getElementById('animeResult');
    resultContainer.innerHTML = ''; // Clear previous results

    if (!data || (Array.isArray(data) && data.length === 0)) {
        resultContainer.innerHTML = 'No results found.';
        return;
    }

    // Check if the data is an array or a single object
    if (Array.isArray(data)) {
        // Iterate through the results and display them
        data.forEach(anime => {
            const resultElement = createResultElement(anime.title, anime.description);
            resultContainer.appendChild(resultElement);
        });
    } else {
        // If the data is not an array, assume it's a single object
        const resultElement = createResultElement(data.title, data.description);
        resultContainer.appendChild(resultElement);
    }
}

// Helper function to create a result element
function createResultElement(title, description) {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<strong>${title}</strong>: ${description}`;
    return resultElement;
}

