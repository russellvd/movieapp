// Constnats to define paths / API related items. 
const API_URL = "https://api.themoviedb.org/3/discover/movie";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_KEY = "a524f9e232d8b09c0ac0db868ddbd59e";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// According to URL, it returns the movie from TMBDI API and "gets" results.
getMovies(API_URL);
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

// for each movie fetched, creates HTML content and "adds" them to main
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3 class="title">${title}</h3>
      </div>
      <div class="overview">
        <h3 class="title">Overview</h3>
        <h2 class="title"><a href="/">${title}</a></h2>
        <p>${overview}</p>
      </div> 
    `;
    main.appendChild(movieEl);
  });


}

/* 
// The event listener prevents the default form submission behavior,
 gets the search term from the input field, and calls the getMovies 
 function with the search API URL and search term.
 if cannot search, prompts the user to enter a movie title.
*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    const url = `${SEARCH_API}?api_key=${API_KEY}&query=${searchTerm}`;
    getMovies(url);
  } else {
    alert("Please enter a movie title");
  }
});
