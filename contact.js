const apiUrl = "http://localhost:8080/contact";

const submitContactForm = async (e) => {
    e.preventDefault();
    const username = document.forms["contactForm"]["name"].value;
    const email = document.forms["contactForm"]["email"].value;
    const message = document.forms["contactForm"]["message"].value;
    const data = {
        username,
        email,
        message,
    };
    console.log("Data to be sent:", data);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();
            // Reset form fields on successful submission
            document.forms["contactForm"]["name"].value = "";
            document.forms["contactForm"]["email"].value = "";
            document.forms["contactForm"]["message"].value = "";
        } else {
            const errorMessage = await response.text();
            console.log("Error Signing up:", errorMessage);
        }
    } catch (error) {
        console.log("Error Signing up:", error.message);
    }
};

document
    .getElementById("contactForm")
    .addEventListener("submit", submitContactForm);
