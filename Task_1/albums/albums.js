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

fetch("https://jsonplaceholder.typicode.com/albums")
  .then((response) => response.json())
  .then((res) => res.filter((cur) => cur.userId === userId))
  .then(function (resp) {
    mainRes = resp;
    addPagination();
    showAlbums(0);
  });

function addPagination() {
  numberOfItems = mainRes.length;
  const pagesNeeded = Math.ceil(numberOfItems / albumsOnPage);
  for (i = 0; i < pagesNeeded; i++) {
    pagination.innerHTML += `<button class="pagination__btn" id="pagBtn${i}" onClick="showAlbums(${i})" >${
      i + 1
    }</button>`;
  }
}

function showAlbums(pageNumer) {
  let activeBtn = document.querySelector(".pagination__btn.active");
  if (activeBtn) {
    activeBtn.classList.remove("active");
  }

  let currentBtn = document.querySelector(`#pagBtn${pageNumer}`);
  currentBtn.classList.add("active");

  let start = pageNumer * albumsOnPage;
  let end = start + albumsOnPage;
  let notes = mainRes.slice(start, end);

  usersAlbums.innerHTML = "";

  for (i = 0; i < notes.length; i++) {
    usersAlbums.innerHTML += `<tr class="album__element">
          <td class="album__number">${mainRes.indexOf(notes[i]) + 1}</td>
          <td>${notes[i].title}</td>
          <td><button class="show-photos-btn" onclick="showPhotos(${
            notes[i].id
          })" id=${notes[i].id}>SHOW PHOTOS</button></td></tr>`;
  }
  if (idOfTheShownAlbum != null) {
    let shownAlbumBtn = document.getElementById(idOfTheShownAlbum);
    if (shownAlbumBtn) shownAlbumBtn.classList.add("active");
  }
}

// ! далі щоб при нажатії на фотку вона теж більша ставала
//! в кінці може зробити стрелочки прокрутки сторінок
