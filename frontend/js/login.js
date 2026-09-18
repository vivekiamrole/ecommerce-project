const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

const API_URL = "http://YOUR_EC2_PUBLIC_IP:5000/api/users/login";

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })

    .then(response => response.json())

    .then(data => {

        message.innerText = data.message;

        if (data.token) {

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            console.log("JWT Token:", data.token);

            alert("Login successful!");

            window.location.href = "products.html";
        }

    })

    .catch(error => {

        message.innerText = "Login failed.";

        console.error(error);

    });

});
