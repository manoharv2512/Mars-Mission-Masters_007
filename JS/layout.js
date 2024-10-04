const seats = document.querySelectorAll('.seat:not(.sold)');
const selectedSeatsCount = document.getElementById('selected-seats');
const totalPriceElement = document.getElementById('total-price');

let selectedSeats = [];
let totalPrice = 0;

// Add click event listener for each seat
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const seatPrice = parseInt(seat.dataset.price);

        if (seat.classList.contains('selected')) {
            // Deselect seat
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seat);
            totalPrice -= seatPrice;
        } else {
            // Select seat
            seat.classList.add('selected');
            selectedSeats.push(seat);
            totalPrice += seatPrice;
        }

        // Update summary
        selectedSeatsCount.textContent = selectedSeats.length;
        totalPriceElement.textContent = totalPrice;
    });
});
