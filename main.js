const login = document.getElementById("login-wrapper");
const loginS = document.getElementById("login-success-wrapper");

function loginPage() {
  window.location.href = "login.html";
}

function loginTest() {
  login.style.display = "none";
  loginS.style.display = "block";
}
