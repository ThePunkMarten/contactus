document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contact-form");
    const loginForm = document.getElementById("loginForm");
    const ticketTable = document.getElementById("ticketTable");
    const tbody = document.querySelector(".ticket-table tbody");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            console.log("Form submitted");

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const phone = contactForm.querySelector('input[name="phone"]').value;
            const comment = contactForm.querySelector('textarea[name="comment"]').value;
            const mediaFile = contactForm.querySelector('input[name="media"]').files[0];

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("comment", comment);
            formData.append("media", mediaFile);

            // Send formData to server for processing
            fetch("submit-ticket.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the response from the server
                loadTicketData(); // Reload the ticket data on success
            })
            .catch(error => {
                console.error("Error submitting ticket:", error);
            });

            // Clear form fields after submission
            console.log(contactForm);
            document.getElementById('contactForm').reset();
        });
    }

    if (loginForm && ticketTable) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
    
            const username = loginForm.querySelector('input[name="username"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;
    
            try {
                const isValid = await isValidUser(username, password);
                
                if (isValid) {
                    loginForm.style.display = "none";
                    ticketTable.classList.remove("hidden");
                    loadTicketData();
                } else {
                    alert("Invalid username or password. Please try again.");
                }
            } catch (error) {
                console.error("Error checking user validity:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }
});


function loadTicketData() {
    console.log("Loading ticket data...");
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        tbody.innerHTML = ""; // Clear existing content

        data.forEach(ticket => {
            const row = document.createElement("tr");

            // Create and append cells for ticket properties
            // ...

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

function isValidUser(username, password) {
    return fetch("users.json")
        .then(response => response.json())
        .then(users => {
            const validUser = users.some(user => user.username === username && user.password === password);
            return validUser;
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            return false;
        });
}