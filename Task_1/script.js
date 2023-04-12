let usersLogin = localStorage.getItem('login')

window.onload = function() {
  if (usersLogin === 'User1') {
    location.href = "./users/users.html"
  }
}

const loginForm = document.querySelector('#login-form');
const userLogin = document.querySelector('#user-login');
const userPassword = document.querySelector('#user-password');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if ((userLogin.value === 'User1' && userPassword.value === '1111a') || (userLogin.value === 'User2' && userPassword.value === '2222a') || (userLogin.value === 'User3' && userPassword.value === '3333a')) {
    location.href = './users/users.html';
    addUserData(userLogin.value, userPassword.value);
  } else {
    window.alert('wrong')
  }
})

function addUserData(login, password) {
localStorage.setItem('login', login);
localStorage.setItem('password', password);
}


// User1 - 1111a
// User2 - 2222a
// User3 - 3333a
