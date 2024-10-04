const API_KEY = "9bb77154";
      const BASE_URL = "https://www.omdbapi.com/";
      const moviesPerPage = 5;

      async function fetchMovies(searchTerm) {
        const url = `${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`;
        const response = await fetch(url);
        return response.json();
      }

      async function fetchPopularMovies(section) {
        let searchTerms;

        switch (section) {
          case "movies":
            searchTerms = [
              "Wanted",
              "Batman",
              "Inception",
              "Titanic",
              "Spiderman",
            ];
            break;
          case "premier":
            searchTerms = ["New Release", "Hot Movie", "Blockbuster"];
            break;
          default:
            searchTerms = [];
        }
        let movies_data=[];
        for (let term of searchTerms) {
          const data = await fetchMovies(term);
          data.Search.forEach((md)=>{
            movies_data.push(md);
          })
          console.log("movies Data", data.Search)
          renderMovies(data.Search, section);
        }
        localStorage.setItem("AllMovies", JSON.stringify(movies_data));
        console.log(movies_data);
      }

      
      

      async function handleBook(index){
        let AllMovies = JSON.parse(localStorage.getItem("AllMovies"));  // Parsing stored data
        let currentMovie = AllMovies[index];  // Get the specific movie by index
        localStorage.setItem("currentMovie", JSON.stringify(currentMovie));  // Store current movie
        window.location.href = "movie-detail.html";  // Redirect to movie detail page
    }

    function renderMovies(movies, section) {
      const container = document.getElementById(`${section}-container`);
      container.innerHTML = ''; // Clear previous content before rendering new movies
  
      if (movies) {
          movies.forEach((movie, index) => {
              const col = document.createElement("div");
              col.classList.add("col-md-3", "mb-4");
              col.innerHTML = `
                  <div class="card">
                      <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                      <div class="card-body">
                          <h5 class="card-title">${movie.Title}</h5>
                          <p class="card-text">Year: ${movie.Year}</p>
                          <button class="btn btn-danger" id="book-btn-${index}">Book Now</button>
                      </div>
                  </div>
              `;
              container.appendChild(col);
  
              // Add event listener to the "Book Now" button
              const bookBtn = document.getElementById(`book-btn-${index}`);
              bookBtn.addEventListener("click", () => {
                  handleBook(index);  // Call handleBook when clicked
              });
          });
      }
  }



      window.onload = () => {
        fetchPopularMovies("movies");
        
      };