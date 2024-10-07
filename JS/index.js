      const API_KEY = "9bb77154";
      const BASE_URL = "https://www.omdbapi.com/";
      const moviesPerPage = 5;

      async function fetchMovies(searchTerm) {
        const url = BASE_URL + "?s=" + searchTerm + "&apikey=" + API_KEY;
        const response = await fetch(url);
        return response.json();
      }

      async function fetchPopularMovies(section) {
        let searchTerms;

        switch (section) {
          case "movies":
            searchTerms = [
              "Avengers",
              "Batman",
              "Inception",
              "Titanic",
              "Spiderman",
            ];
            break;
          // Add other cases for different sections as needed
          default:
            searchTerms = [];
        }

        let allMovies = [];

        for (let term of searchTerms) {
          const data = await fetchMovies(term);
          if (data.Search) {
            allMovies = allMovies.concat(data.Search); // Collect all movies
          }
        }

        // Save all fetched movies to localStorage for reference in detail page
        localStorage.setItem("AllMovies", JSON.stringify(allMovies));
        renderMovies(allMovies, "movies-container");
      }

      function renderMovies(movies, containerId) {
        const container = document.getElementById(containerId);

        if (movies) {
          container.innerHTML = ""; // Clear previous content
          movies.forEach((movie, index) => {
            const col = document.createElement("div");
            col.classList.add("col-md-3", "mb-4");
            col.innerHTML = `
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body text-center">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year}</p>
                <button class="btn btn-custom book-now-btn" data-index="${index}">Book Now</button>
            </div>
        </div>
      `;
            container.appendChild(col);
          });
        }
      }

      // Save booked movie to localStorage
      function saveToLocalStorage(movie) {
        let bookedMovies =
          JSON.parse(localStorage.getItem("bookedMovies")) || [];

        // Check if the movie is already booked
        if (!bookedMovies.some((bookedMovie) => bookedMovie.id === movie.id)) {
          bookedMovies.push(movie);
          localStorage.setItem("bookedMovies", JSON.stringify(bookedMovies));
          alert(`Movie "${movie.title}" has been booked successfully!`);
        } else {
          alert(`Movie "${movie.title}" is already booked.`);
        }
      }

      // Handle "Book Now" button clicks
      document.addEventListener("click", function (event) {
        if (event.target.classList.contains("book-now-btn")) {
          const index = event.target.getAttribute("data-index");

          // Use the handleBook function to store current movie and redirect
          handleBook(index);
        }
      });

      // Store current movie and redirect to movie detail page
      async function handleBook(index) {
        let AllMovies = JSON.parse(localStorage.getItem("AllMovies")); // Parsing stored data
        let currentMovie = AllMovies[index]; // Get the specific movie by index
        localStorage.setItem("currentMovie", JSON.stringify(currentMovie)); // Store current movie
        window.location.href = "movie-detail.html"; // Redirect to movie detail page
      }

      // Fetch and render popular movies
      fetchPopularMovies("movies");
    