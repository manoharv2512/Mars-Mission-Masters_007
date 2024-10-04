// Titles: https://omdbapi.com/?s=thor&page=1&apikey=608f9a10
// details: http://www.omdbapi.com/?i=tt3896198&apikey=608f9a10


const resultGrid = document.getElementById('result-grid');

// Retrieve the stored movie details from localStorage
let storeMovie = JSON.parse(localStorage.getItem('currentMovie'));

if (storeMovie && storeMovie.imdbID) {
    // Fetch full movie details using the imdbID
    fetchMovieDetails(storeMovie.imdbID);
} else {
    console.error("No movie found in localStorage or imdbID is missing.");
}

async function fetchMovieDetails(imdbID) {
    try {
        const URL = `http://www.omdbapi.com/?i=${imdbID}&apikey=608f9a10`; // Fetch movie by imdbID
        const res = await fetch(URL);
        const movieDetails = await res.json();
        
        if (movieDetails.Response === "True") {
            displayMovieDetails(movieDetails);  // Display the fetched details
        } else {
            console.error("Error fetching movie details: ", movieDetails.Error);
        }
    } catch (error) {
        console.error("Failed to fetch movie details:", error);
    }
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${details.Poster !== "N/A" ? details.Poster : "Images/image_not_found.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        </div>
    `;
}
