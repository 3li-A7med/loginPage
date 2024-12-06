// Function to switch to the login form
function switchToLogin() {
  document.getElementById('registrationForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
}

// Function to switch to the registration form
function switchToRegister() {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registrationForm').classList.add('active');
}

// Function to show the welcome page
function welcomePage(user) {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registrationForm').classList.remove('active');
  document.querySelector('.container').classList.add('d-none');
  document.querySelector(".welcome-message").classList.remove("d-none");

  // Display the user's name on the welcome page
  document.getElementById("userNameDisplay").innerText = user.userName;
  
  showLogoutButton();
}

// Function to show the logout button
function showLogoutButton() {
  var logoutDiv = document.querySelector(".welcome-message");
  logoutDiv.classList.remove("d-none");
  
  document.getElementById("logoutButton").addEventListener("click", function () {
    logout();
  });
}

// Function to log out
function logout() {
  document.querySelector(".welcome-message").classList.add("d-none");
  document.querySelector('.container').classList.remove('d-none');
  switchToLogin();
}

// Registration form submit event
document.querySelector("#registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var userName = document.querySelector(".userName").value.trim();
  var email = document.querySelector(".emailUser").value.trim();
  var password = document.querySelector(".passwordUser").value.trim();
  var confirmPassword = document.querySelector("#confirmPassword").value.trim();

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var passwordRegex = /^.{3,}$/;
  var userRegex = /^[a-zA-Z0-9]+$/;

  if (!userRegex.test(userName)) {
    document.querySelector(".userError").classList.remove("d-none");
    document.querySelector(".userError").innerHTML = "<p>Username can only contain letters and numbers, with no spaces or special characters!</p>";
    return;
  } else {
    document.querySelector(".userError").classList.add("d-none");
  }

  if (!emailRegex.test(email)) {
    document.querySelector(".emailError").classList.remove("d-none");
    document.querySelector(".emailError").innerHTML = "<p>Please enter a valid email address!</p>";
    return;
  } else {
    document.querySelector(".emailError").classList.add("d-none");
  }

  if (!passwordRegex.test(password)) {
    document.querySelector(".passError").classList.remove("d-none");
    document.querySelector(".passError").innerHTML = "<p>Please use a strong password!</p>";
    return;
  } else {
    document.querySelector(".passError").classList.add("d-none");
  }

  if (password !== confirmPassword) {
    document.querySelector(".confirmError").classList.remove("d-none");
    document.querySelector(".confirmError").innerHTML = "<p>Passwords do not match!</p>";
    return;
  } else {
    document.querySelector(".confirmError").classList.add("d-none");
  }

  var users = JSON.parse(localStorage.getItem("usersDB")) || [];
  users.push({ userName, email, password });
  localStorage.setItem("usersDB", JSON.stringify(users));

  switchToLogin();
});

// Login form submit event
document.querySelector("#loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var email = document.querySelector("#loginEmail").value.trim();
  var password = document.querySelector("#loginPassword").value.trim();

  var loginEmailError = document.querySelector("#loginEmailError");
  var loginPassError = document.querySelector("#loginPasswordError");
  loginEmailError.classList.add("d-none");
  loginPassError.classList.add("d-none");

  if (!email) {
    loginEmailError.classList.remove("d-none");
    loginEmailError.innerText = "Email is required.";
    return;
  }

  if (!password) {
    loginPassError.classList.remove("d-none");
    loginPassError.innerText = "Password is required.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("usersDB")) || [];

  var user = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      user = users[i];
      break;
    }
  }

  if (!user) {
    loginEmailError.classList.remove("d-none");
    loginEmailError.innerText = "Invalid email or password. Please try again.";
  } else {
    welcomePage(user);
  }
});
