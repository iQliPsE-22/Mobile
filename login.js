function showSignup() {
  document.getElementById("Login").style.display = "none";
  document.getElementById("Signup").style.display = "block";
}

function showLogin() {
  document.getElementById("Signup").style.display = "none";
  document.getElementById("Login").style.display = "block";
}

const apiUrl = "http://localhost:8080/";

const submitLoginForm = async (e) => {
  e.preventDefault();
  const username = document.forms["loginForm"]["username"].value;
  const password = document.forms["loginForm"]["password"].value;

  const data = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(apiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("Login Successful:", responseData);
      window.location.href = "index.html"; // Navigate to index.html
    } else {
      const errorMessage = await response.text();
      console.log("Error Logging in:", errorMessage);
    }
  } catch (error) {
    console.log("Error Logging in:", error.message);
  }
};

const submitSignupForm = async (e) => {
  e.preventDefault();
  const username = document.forms["signupForm"]["username"].value;
  const email = document.forms["signupForm"]["email"].value;
  const phone = document.forms["signupForm"]["phone"].value;
  const password = document.forms["signupForm"]["password"].value;
  const confirmPassword =
    document.forms["signupForm"]["confirm-password"].value;

  const data = {
    username: username,
    email: email,
    phone: phone,
    password: password,
    confirm: confirmPassword,
  };
  console.log("Data to be sent:", data);

  try {
    const response = await fetch(apiUrl + "user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
    } else {
      const errorMessage = await response.text();
      console.log("Error Signing up:", errorMessage);
    }
  } catch (error) {
    console.log("Error Signing up:", error.message);
  }
};

document
  .getElementById("loginForm")
  .addEventListener("submit", submitLoginForm);
document
  .getElementById("signupForm")
  .addEventListener("submit", submitSignupForm);
