console.log(db)

let usersLogin = localStorage.getItem('login');
let usersPassword = localStorage.getItem('password')

const wrongLoginScreen = document.querySelector('#wrong-data-screen-wrapper')

window.onload = function() {
  if (userValidation(usersLogin, usersPassword)) {
    location.href = "./users/users.html"
  }
}

const loginForm = document.querySelector('#login-form');
const userLogin = document.querySelector('#user-login');
const userPassword = document.querySelector('#user-password');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (userValidation(userLogin.value, userPassword.value)) {
    location.href = './users/users.html';
    addUserData(userLogin.value, userPassword.value);
  } else {
    wrongLoginScreen.style.display = "flex";
  }
})

function addUserData(login, password) {
localStorage.setItem('login', login);
localStorage.setItem('password', password);
}

function tryAgain() {
  wrongLoginScreen.style.display = "none";
  userLogin.value = '';
  userPassword.value = '';
}