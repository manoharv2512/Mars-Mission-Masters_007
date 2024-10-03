// Search functionality (this is just a simulation)
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', function() {
  const query = searchInput.value.trim();
  if (query) {
    alert(`Searching for "${query}"...`);
  } else {
    alert("Please enter a search term.");
  }
});

// Showtime selection interaction
const showtimeElements = document.querySelectorAll('.showtime');

showtimeElements.forEach(showtime => {
  showtime.addEventListener('click', function() {
    alert(`You selected ${showtime.innerText} showtime.`);
  });
});

// Button interactivity
const mTicketButton = document.querySelector('.ticket-options button:first-child');
const foodBeverageButton = document.querySelector('.ticket-options button:last-child');

mTicketButton.addEventListener('click', function() {
  alert("M-Ticket option selected. Proceeding to booking...");
});

foodBeverageButton.addEventListener('click', function() {
  alert("Food & Beverage option selected. Adding to booking...");
});

// Location change simulation
const locationDiv = document.querySelector('.location');
locationDiv.addEventListener('click', function() {
  const newLocation = prompt("Enter your new location:");
  if (newLocation) {
    locationDiv.innerText = newLocation;
  }
});

// User Sign-In simulation
const signInButton = document.querySelector('.user-actions button');
signInButton.addEventListener('click', function() {
  const userName = prompt("Enter your username:");
  if (userName) {
    alert(`Welcome, ${userName}!`);
  }
});
