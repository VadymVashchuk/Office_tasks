const albumPhotos = document.querySelector("#photos-wrapper");
const allBtns = document.querySelector("#btns-wrapper");
const bigPhotoWindow = document.querySelector("#photo-window");
const bigImgWrapper = document.querySelector("#big-img-wrapper")

function showPhotos(albumId) {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((res) => res.filter((cur) => cur.albumId === albumId))
    .then((resp) => {
      addAlbumsPhotos(resp);
      makebtnActive(albumId);
      idOfTheShownAlbum = albumId;
    });
}

function addAlbumsPhotos(arr) {
  clearPhotos();
  for (i = 0; i < arr.length; i++) {
    albumPhotos.innerHTML += `<div class="photos__el">
      <div class="photos__el__title">${arr[i].title}</div>
      <div class="photos__el__photo"><img src="${arr[i].thumbnailUrl}" onclick="showBigPhoto('${arr[i].url}')" /></div>
    </div>`;
  }
  allBtns.innerHTML += `<button class="home-btn" onclick="clearPhotos()">CLEAR</button>`;
}

function clearPhotos() {
  albumPhotos.innerHTML = "";
  allBtns.innerHTML = `<button class="home-btn" onclick="location.href='../users/users.html'">HOME</button>`;
  clearActiveClassOnBtns();
  idOfTheShownAlbum = null;
}

function makebtnActive(btnId) {
  clearActiveClassOnBtns();
  let curBtn = document.getElementById(btnId);
  curBtn.classList.add("active");
}

function clearActiveClassOnBtns() {
  let alreadyActiveBtn = document.querySelector(".show-photos-btn.active");
  if (alreadyActiveBtn) {
    alreadyActiveBtn.classList.remove("active");
  }
}

function showBigPhoto(photoUrl) {
  bigPhotoWindow.style.display = "flex";
  bigImgWrapper.innerHTML = `<img src='${photoUrl}' />`
}

function hideBigPhoto() {
  bigPhotoWindow.style.display = "none";
}