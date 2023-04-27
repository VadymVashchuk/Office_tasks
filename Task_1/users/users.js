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

title.innerHTML = `WARDROBE OF<br>${usersLogin}`;

let result = [];

// db.collection(usersLogin).onSnapshot((querySnapshot) => {
//   console.log("here");
// });

// db.collection(usersLogin)
//   .get()
//   .then((res) => {
//     result = res;
//     console.log({ res });
//     res.docs.forEach((doc) => {
//       renderItems(doc);
//     });
//   });

function renderItems(item) {
  wardrobe.innerHTML += `<tr class="user__element" id="${item.id}">
  <td class="user__username">${item.data().name}</td>
  <td>${item.data().color}</td>
  <td>${item.data().size}</td>
  <td>${item.data().purpose}</td>
  <td><img src="${item.data().picture}" alt="Error" class="item_img"></td>
  <td class="btns-wrapper">
  <button class="edit-btns__el common-btn" onclick="editItem('${item.id}')">Edit</button>
  <button class="edit-btns__el common-btn" onclick="delItem('${item.id}')">Del</button>
  </td>
  </tr>`;
}

// Realtime stuff

db.collection(usersLogin).onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == 'added') {
      renderItems(change.doc)
    } else if (change.type == 'removed') {
      let item = wardrobe.querySelector('[id=' + change.doc.id + ']')
      wardrobe.removeChild(item)
    } else if (change.type == 'modified') {
      wardrobe.querySelector('[id=' + change.doc.id + ']').innerHTML = `<td class="user__username">${change.doc.data().name}</td>
      <td>${change.doc.data().color}</td>
      <td>${change.doc.data().size}</td>
      <td>${change.doc.data().purpose}</td>
      <td><img src="${change.doc.data().picture}" alt="Error" class="item_img"></td>
      <td class="btns-wrapper">
      <button class="edit-btns__el common-btn" onclick="editItem('${change.doc.id}')">Edit</button>
      <button class="edit-btns__el common-btn" onclick="delItem('${change.doc.id}')">Del</button>
      </td>`
    }
  })
})


/// buttons functions

// Add item

const bigAddBtn = document.querySelector("#btn-add");
const editForm = document.querySelector("#edit-form");
const smallBtnAdd = document.querySelector("#add-btn");
const smallBtnEdit = document.querySelector("#edit-btn");

function addNewItem() {
  editForm.style.display = "flex";
  smallBtnAdd.style.display = "inline";
  smallBtnEdit.style.display = "none";
  bigAddBtn.style.display = "none";
}

function sendNewDoc() {
  db.collection(usersLogin).add({
    name: editForm.name.value,
    color: editForm.color.value,
    size: editForm.size.value,
    purpose: editForm.purpose.value,
    picture: editForm.picture.value,
  });
  cancelEditing();
}

// Edit item

let itemEditing;

function editItem(idOfItem) {
  itemEditing = wardrobe.querySelector('[id=' + idOfItem + ']')
  let arrOfTds = itemEditing.querySelectorAll('td')

  editForm.style.display = "flex";
  smallBtnAdd.style.display = "none";
  smallBtnEdit.style.display = "inline";

  editForm.name.value = arrOfTds[0].innerHTML;
  editForm.color.value = arrOfTds[1].innerHTML;
  editForm.size.value = arrOfTds[2].innerHTML;
  editForm.purpose.value = arrOfTds[3].innerHTML;
  editForm.picture.value = arrOfTds[4].children[0].src;
}

function setDoc() {
  db.collection(usersLogin).doc(itemEditing.id).set({
    name: editForm.name.value,
    color: editForm.color.value,
    size: editForm.size.value,
    purpose: editForm.purpose.value,
    picture: editForm.picture.value,
  });
  cancelEditing();
}


// Delete item

function delItem(idOfItem) {
  if (window.confirm("Are you sure?")) {
    db.collection(usersLogin).doc(idOfItem).delete();
  }
}


function cancelEditing() {
  editForm.style.display = "none";
  bigAddBtn.style.display = "inline";
  editForm.name.value = '';
  editForm.color.value = '';
  editForm.size.value = '';
  editForm.purpose.value = '';
  editForm.picture.value = '';
}
