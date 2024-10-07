
        function login() {
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var alertSuccess = document.getElementById("alertSuccess");
            var alertError = document.getElementById("alertError");

            // Reset alerts
            alertSuccess.style.display = 'none';
            alertError.style.display = 'none';

            // Static login options
            var validCredentials = [
                { email: "admin@gmail.com", password: "admin" }
            ];

            // Check if the entered credentials match any of the valid credentials
            var isValid = validCredentials.some(function (cred) {
                return cred.email === email && cred.password === password;
            });

            if (isValid) {
                alertSuccess.style.display = 'block';
                setTimeout(function () {
                    window.location.href = '../index.html'; // Redirect to your dashboard page
                }, 2000);
            } else {
                alertError.style.display = 'block';
            }
        }

        function staticLogin(platform) {
            alert(platform + " login clicked!");
            
        }
    