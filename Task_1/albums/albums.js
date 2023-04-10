const usersAlbums = document.querySelector("#albums-table-body");
const mainTitle = document.querySelector("#main-title");

const params = new URL(document.location).searchParams;
const userName = params.get("username");
const userId = Number(params.get("userId"));

mainTitle.innerHTML = "All " + userName + "'s Albums";

fetch("https://jsonplaceholder.typicode.com/albums")
  .then((response) => response.json())
  .then((resp) => addUsersAlbums(resp.filter((cur) => cur.userId === userId)));

function addUsersAlbums(arr) {
  for (i = 0; i < arr.length; i++) {
    usersAlbums.innerHTML += `<tr class="album__element">
      <td class="album__number">${i + 1}</td>
      <td>${arr[i].title}</td>
      <td><button class="show-photos-btn" onclick="location.href='../photos/photos.html?userId=${userId}&username=${userName}&albumId=${arr[i].id}&albumname=${arr[i].title}'">SHOW PHOTOS</button></td>
      </tr>`
  }
}
