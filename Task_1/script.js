let usersLogin = localStorage.getItem("login");
let usersPassword = localStorage.getItem("password");
let isLoggedIn = localStorage.getItem("isLoggedIn");

const wrongLoginText = document.querySelector("#wrong-data-wrapper");

window.onload = function () {
  if (isLoggedIn === "true") {
    location.href = "./users/users.html";
  }
};

// window.onload = function() {     ----------------- ПАРАЛЕЛЬНА ПЕРЕВІРКА ЧЕРЕЗ ЗАПРОС НА FIREBASE ЯКЩО РАПТОМ ТРЕБА БУДЕ ВОНА
//   firebase.auth().signInWithEmailAndPassword(usersLogin, usersPassword)
//   .then(function () {
//     location.href = "./users/users.html"
// }, function(error) {console.clear()})
// }

const loginForm = document.querySelector("#login-form");
const userLogin = document.querySelector("#user-login");
const userPassword = document.querySelector("#user-password");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(userLogin.value, userPassword.value)
    .then(
      function () {
        location.href = "./users/users.html";
        addUserData(userLogin.value, userPassword.value);
      },
      function (error) {
        wrongLoginText.innerHTML = error.message.replace("Firebase: ", "");
      }
    );
});

function addUserData(login, password) {
  localStorage.setItem("login", login);
  localStorage.setItem("password", password);
  localStorage.setItem("isLoggedIn", "true");
}
