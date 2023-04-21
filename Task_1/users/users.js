/// all loginization

let usersLogin = localStorage.getItem("login");
let usersPassword = localStorage.getItem("password");
let isLoggedIn = localStorage.getItem("isLoggedIn");

window.onload = function () {
  if (isLoggedIn === "true") {
    document.getElementById("currentUserLogin").innerHTML = usersLogin;
  } else {
    location.href = "../index.html";
  }
};

function logOut() {
  localStorage.clear();
  location.href = "../index.html";
}

/// data rendering

const title = document.querySelector("#main-title");
const wardrobe = document.querySelector("#wardrobe-table-body");

title.innerHTML = `WARDROBE OF ${usersLogin}`;

let result;

db.collection(usersLogin)
  .get()
  .then((res) => {
    result = res;
    res.docs.forEach((doc) => {
      renderItems(doc);
    });
  });

function renderItems(item) {
  wardrobe.innerHTML += `<tr class="user__element" id="${item.id}">
  <td class="user__username">${item.data().name}</td>
  <td>${item.data().color}</td>
  <td>${item.data().size}</td>
  <td>${item.data().purpose}</td>
  <td><img src="${item.data().picture}" alt="Error" class="item_img"></td>
</tr>`;
}

/// buttons functions

// Add item

const editForm = document.querySelector("#edit-form");

function addNewItem() {
  editForm.style.display = "flex";
  document.querySelector("#edit-btn").style.display = "none";
}

function sendNewDoc() {
  db.collection(usersLogin).add({
    name: editForm.name.value,
    color: editForm.color.value,
    size: editForm.size.value,
    purpose: editForm.purpose.value,
    picture: editForm.picture.value,
  });
  pageRefresh();
}

// Edit item

function editItem() {
  let arr = document.querySelectorAll(".user__element");
  arr.forEach((item) => {
    item.setAttribute("onClick", `editDoc('${item.id}')`)
    item.classList.add('ready-to-choose')
});
}

let itemEditing;

function editDoc(idOfItem) {
  itemEditing = result.docs.find((i) => i.id == idOfItem);

  editForm.style.display = "flex";
  document.querySelector("#add-btn").style.display = "none";
  editForm.name.value = itemEditing.data().name;
  editForm.color.value = itemEditing.data().color;
  editForm.size.value = itemEditing.data().size;
  editForm.purpose.value = itemEditing.data().purpose;
  editForm.picture.value = itemEditing.data().picture;
}

function setDoc() {
  db.collection(usersLogin).doc(itemEditing.id).set({
    name: editForm.name.value,
    color: editForm.color.value,
    size: editForm.size.value,
    purpose: editForm.purpose.value,
    picture: editForm.picture.value,
  });
  pageRefresh();
}

// Delete item

function delItem() {
  let arr = document.querySelectorAll(".user__element");
  arr.forEach((item) => {
    item.setAttribute("onClick", `deleteFromDoc('${item.id}')`)
    item.classList.add('ready-to-choose')
  }
  );
}

function deleteFromDoc(idOfItem) {
  db.collection(usersLogin).doc(idOfItem).delete();
  pageRefresh();
}


function pageRefresh() {
  setTimeout(() => {
    location.reload();
  }, 500); // ДУЖЕ ВАЖЛИВО ЗАДАВАТИ ЙОГО ВОТ ТАК, прописувати функцію всрередині
}
