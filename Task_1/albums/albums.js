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

const usersAlbums = document.querySelector("#albums-table-body");
const pagination = document.querySelector("#pagination");
const mainTitle = document.querySelector("#main-title");

const params = new URL(document.location).searchParams;
const userName = params.get("username");
const userId = Number(params.get("userId"));

let idOfTheShownAlbum;

const albumsOnPage = 3;
let mainRes = [];

mainTitle.innerHTML = "All " + userName + "'s Albums";

fetch("https://jsonplaceholder.typicode.com/albums") //получаю альбоми, які малюються в showAlbums()
  .then((response) => response.json())
  .then((res) => res.filter((cur) => cur.userId === userId))
  .then(function (resp) {
    mainRes = resp;
    addPagination();
    showAlbums(0);
  });

function addPagination() {            // функція для отрисовки кнопочок
  numberOfItems = mainRes.length;
  const pagesNeeded = Math.ceil(numberOfItems / albumsOnPage);
  for (i = 0; i < pagesNeeded; i++) {
    pagination.innerHTML += `<button class="pagination__btn" id="pagBtn${i}" onClick="showAlbums(${i})" >${
      i + 1
    }</button>`;
  }
}

function showAlbums(pageNumer) {          //функція, яка робить самі альбоми при надатії на кнопку
  let activeBtn = document.querySelector(".pagination__btn.active");
  if (activeBtn) {
    activeBtn.classList.remove("active");      //це щоб прибрати актів з кнопочок
  }

  let currentBtn = document.querySelector(`#pagBtn${pageNumer}`);
  currentBtn.classList.add("active");                //це щоб додавався актів при натисканні на кнопку

  let start = pageNumer * albumsOnPage;         //це вираховується розмір слайса і робиться сам слайс основного масіва з альбомами
  let end = start + albumsOnPage;
  let notes = mainRes.slice(start, end);

  usersAlbums.innerHTML = "";

  for (i = 0; i < notes.length; i++) {              //тут просто через цикл слайс масиву додається в html
    usersAlbums.innerHTML += `<tr class="album__element">
          <td class="album__number">${mainRes.indexOf(notes[i]) + 1}</td>
          <td>${notes[i].title}</td>
          <td><button class="show-photos-btn" onclick="showPhotos(${
            notes[i].id
          })" id=${notes[i].id}>SHOW PHOTOS</button></td></tr>`;
  }
  if (idOfTheShownAlbum != null) {                // це щоб актів на кнопках "показати фото" працював
    let shownAlbumBtn = document.getElementById(idOfTheShownAlbum);
    if (shownAlbumBtn) {
      shownAlbumBtn.classList.add("active");
    }
  }
}

function logOut() {
  localStorage.clear();
  location.href = "../index.html";
}