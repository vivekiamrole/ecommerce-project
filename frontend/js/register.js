



#THIS IS FOR singup or register userid passwd

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

const API_URL = "http://YOUR_EC2_PUBLIC_IP:5000/api/users/register";

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const user = {
        name: document.getElementById("name").value,
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

        if (data.userId) {
            registerForm.reset();
        }

    })

    .catch(error => {

        message.innerText = "Registration failed.";

        console.error(error);

    });

});
