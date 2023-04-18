let usersLogin = localStorage.getItem('login');
let usersPassword = localStorage.getItem('password');
let isLoggedIn = localStorage.getItem('isLoggedIn');

window.onload = function() {
  if (isLoggedIn === 'true') {
    document.getElementById('currentUserLogin').innerHTML = usersLogin;
  } else {
    location.href = "../index.html"
  }
}

const users = document.querySelector("#users-table-body");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((resp) => addUsers(resp));

function addUsers(arr) {
  for (i = 0; i < arr.length; i++) {
    users.innerHTML += `<tr class="user__element">
        <td class="user__username">${arr[i].username}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].address.city}</td>
        <td>${arr[i].email}</td>
        <td>${arr[i].phone}</td>
        <td><button class="show-album-btn" onclick="location.href='../albums/albums.html?userId=${arr[i].id}&username=${arr[i].username}'">SHOW ALBUM</button></td>
      </tr>`
  }
}

function logOut() {
  localStorage.clear();
  location.href = "../index.html";
}