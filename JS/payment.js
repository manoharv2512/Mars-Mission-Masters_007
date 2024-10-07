// Add this code in payment.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters
    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            finalPrice: parseInt(params.get('totalPrice')) || 0, // Get totalPrice, default to 0 if not present
        };
    };

    // Get the final price from the URL
    const { finalPrice } = getQueryParams();

    // Display the final price on the payment page
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `Rs. ${finalPrice}`; // Format it appropriately
    }
});
