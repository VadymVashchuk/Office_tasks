const albumsPhotos = document.querySelector("#photos-wrapper");
const mainTitle = document.querySelector("#main-title");

const params = new URL(document.location).searchParams;

const userName = params.get("username");
const userId = Number(params.get("userId"));
const albumName = params.get("albumname");
const albumId = Number(params.get("albumId"));

mainTitle.innerHTML = userName.toUpperCase() + "<br>" + "<i>" + albumName.toUpperCase() + "</i>";

fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((resp) => addAlbumsPhotos(resp.filter((cur) => cur.albumId === albumId)));

function addAlbumsPhotos(arr) {
  for (i = 0; i < arr.length; i++) {
    albumsPhotos.innerHTML += `<div class="photos__el">
      <div class="photos__el__title">${arr[i].title}</div>
      <div class="photos__el__photo"><a href="${arr[i].url}"><img src="${arr[i].thumbnailUrl}" alt="Error"></a></div>
    </div>`
  }
}

function goBack() {
  location.href = `../albums/albums.html?userId=${userId}&username=${userName}`
}
