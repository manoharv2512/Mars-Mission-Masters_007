const seats = document.querySelectorAll('.seat'); // Select all seats
const selectedSeatsCount = document.getElementById('selected-seats'); // Display selected seat count
const totalPriceElement = document.getElementById('total-price'); // Display total price
const bookNowButton = document.getElementById('book-now'); // Book now button

let storeMovie = JSON.parse(localStorage.getItem('currentMovie'));
let movieName = storeMovie.Title;
let temp = document.getElementById("movieName");
temp.innerText = movieName;
let selectedSeats = new Set(); // Use a Set to avoid duplicates
let totalPrice = 0; // Initialize total price

// Function to update the summary display
const updateSummary = () => {
    selectedSeatsCount.textContent = selectedSeats.size; // Update the count of selected seats
    totalPriceElement.textContent = totalPrice; // Update the total price
};

// Add click event listener for each seat
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const seatPrice = parseInt(seat.dataset.price); // Get the price of the selected seat

        if (selectedSeats.has(seat)) {
            // Deselect seat if already selected
            selectedSeats.delete(seat);
            seat.classList.remove('selected');
            totalPrice -= seatPrice; // Decrease total price
        } else {
            // Select seat if not already selected
            selectedSeats.add(seat);
            seat.classList.add('selected');
            totalPrice += seatPrice; // Increase total price
        }

        // Update summary
        updateSummary();
    });
});

// Add click event listener for the book now button
bookNowButton.addEventListener('click', () => {
    if (selectedSeats.size === 0) {
        alert("Please select at least one seat before booking."); // Alert if no seats are selected
        return;
    }

    // Get the seat numbers
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.textContent).join(', ');
    
    // Alert the seat numbers and total price
    alert(`You are booking the following seats: ${seatNumbers}\nTotal Price: Rs. ${totalPrice}`);
    
    // Redirect to addon.html with total price as a query parameter
    window.location.href = `addon.html?totalPrice=${totalPrice}`;
});
