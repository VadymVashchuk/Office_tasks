const usersAlbums = document.querySelector("#albums-table-body");
const pagination = document.querySelector("#pagination");
const mainTitle = document.querySelector("#main-title");

const params = new URL(document.location).searchParams;
const userName = params.get("username");
const userId = Number(params.get("userId"));

const albumsOnPage = 3;
let mainRes = [];

mainTitle.innerHTML = "All " + userName + "'s Albums";

fetch("https://jsonplaceholder.typicode.com/albums")
  .then((response) => response.json())
  .then((res) => res.filter((cur) => cur.userId === userId))
  .then(function (resp) {
    console.log(resp);
    mainRes = resp;
    addPagination();
    showAlbums(0);
  });

function addPagination() {
  numberOfItems = mainRes.length;
  const pagesNeeded = Math.ceil(numberOfItems / albumsOnPage);
  for (i = 1; i <= pagesNeeded; i++) {
    pagination.innerHTML += `<button class="pagination__btn" id="pagBtn${i - 1}" onClick="showAlbums(${
      i - 1
    })" >${i}</button>`;
  }
}

function showAlbums(pageNumer) {


  let currentBtn = document.querySelector(`#pagBtn${pageNumer}`)
  currentBtn.classList.add('active')

  let start = pageNumer * albumsOnPage;
  let end = start + albumsOnPage;
  let notes = mainRes.slice(start, end);
  console.log(notes);

  usersAlbums.innerHTML = "";
  for (let note of notes) {
    usersAlbums.innerHTML += `<tr class="album__element">
          <td class="album__number">${mainRes.indexOf(note) + 1}</td>
          <td>${note.title}</td>
          <td><button class="show-photos-btn" onclick="location.href='../photos/photos.html?userId=${userId}&username=${userName}&albumId=${note.id}&albumname=${note.title}'">SHOW PHOTOS</button></td></tr>`;
  }
}



// ! доробити актів, далі засовувати під таблицю фотки після нажатія кнопки show photos. далі щоб при нажатії на фотку вона теж більша ставала