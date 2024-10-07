// Function to get query parameters
const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        totalPrice: parseInt(params.get('totalPrice')) || 0, // Get totalPrice, default to 0 if not present
    };
};

// Get the initial total price from the URL
const { totalPrice: initialTotalPrice } = getQueryParams();

const selectedSeatsCount = document.getElementById('selected-seats'); // Display selected seat count
const totalPriceElement = document.getElementById('total-price'); // Display total price
const proceedToPaymentButton = document.getElementById('book-now'); // Proceed to payment button

let selectedSeats = new Set(); // Use a Set to avoid duplicates
let totalPrice = initialTotalPrice; // Initialize total price with the value from layout.js

// Function to update the summary display
const updateSummary = () => {
    selectedSeatsCount.textContent = selectedSeats.size; // Update the count of selected seats
    totalPriceElement.textContent = `Rs. ${totalPrice}`; // Update the total price
};

// Add click event listener for food items
const foodItems = document.querySelectorAll('.food-item'); // Assuming you have food items with this class
foodItems.forEach(item => {
    item.addEventListener('click', () => {
        const foodPrice = parseInt(item.dataset.price); // Get food price from data attribute

        if (item.classList.contains('selected')) {
            // Deselect food item if already selected
            item.classList.remove('selected');
            totalPrice -= foodPrice; // Decrease total price
        } else {
            // Select food item if not already selected
            item.classList.add('selected');
            totalPrice += foodPrice; // Increase total price
        }

        // Update summary display
        updateSummary();
    });
});

// Add click event listener for the proceed to payment button
proceedToPaymentButton.addEventListener('click', () => {
    // Alert the final price before proceeding to payment
    alert(`You are about to proceed to payment.\nTotal Amount: Rs. ${totalPrice}`);

    // Redirect to the payment page (update the URL to your payment page)
    window.location.href = `payment.html?totalPrice=${totalPrice}`; // Update to match payment.html
});

// Update the summary display initially
updateSummary();


