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
      result.push(change.doc);
    } else if (change.type == 'removed') {
      item = document.getElementById(`${change.doc.id}`)
      item.remove()
    } else if (change.type == 'modified') {
      document.getElementById(`${change.doc.id}`).innerHTML = `<td class="user__username">${change.doc.data().name}</td>
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
const bigAddBtnWrapper = document.querySelector('.change-content-btns-wrapper')
let localEditForm;
let arrOfTds;

function addNewItem() {
  editForm.style.display = "flex";
  bigAddBtnWrapper.style.display = "none";
}

function sendNewDoc() {
  db.collection(usersLogin).add({
    name: editForm.name.value,
    color: editForm.color.value,
    size: editForm.size.value,
    purpose: editForm.purpose.value,
    picture: editForm.picture.value,
  });
  cancelAdding();
}

function cancelAdding() {
  editForm.style.display = "none";
  bigAddBtnWrapper.style.display = "block";
  editForm.name.value = '';
  editForm.color.value = '';
  editForm.size.value = '';
  editForm.purpose.value = '';
  editForm.picture.value = '';
}

// Edit item

let itemEditing;

function editItem(idOfItem) {
  itemEditing = document.getElementById(`${idOfItem}`)
  arrOfTds = itemEditing.querySelectorAll('td')

  bigAddBtn.setAttribute("disabled", "true");

  itemEditing.innerHTML = `<td colspan="6">
    <div class="local-edit-form-wrapper">
      <form id="local-edit-form">
        <div class="form__el">
          <label for="name">Item name</label>
          <input type="text" name="name" class="edit-form-input" autocomplete="off">
        </div>
        <div class="form__el">
          <label for="color">Color</label>
          <input type="text" name="color" class="edit-form-input" autocomplete="off">
        </div>
        <div class="form__el">
          <label for="size">Size</label>
          <input type="text" name="size" class="edit-form-input" autocomplete="off">
        </div>
        <div class="form__el">
          <label for="purpose">Purpose of use</label>
          <input type="text" name="purpose" class="edit-form-input" autocomplete="off">
        </div>
        <div class="form__el">
          <label for="picture">Picture URL</label>
          <input type="text" name="picture" class="edit-form-input" autocomplete="off">
        </div>
        <div class="form__el local-form__btns">
          <button type="button" class="common-btn" id="local-save-btn" onclick="setDoc()">Save</button>
          <button type="button" class="common-btn" id="local-cancel-btn" onclick="cancelEdditing()">Cancel</button>
        </div>
      </form>
    </div>
  </td>`

  localEditForm = document.querySelector("#local-edit-form");

  localEditForm.name.value = arrOfTds[0].innerHTML;
  localEditForm.color.value = arrOfTds[1].innerHTML;
  localEditForm.size.value = arrOfTds[2].innerHTML;
  localEditForm.purpose.value = arrOfTds[3].innerHTML;
  localEditForm.picture.value = arrOfTds[4].children[0].src;

}

function setDoc() {
    db.collection(usersLogin).doc(itemEditing.id).set({
    name: localEditForm.name.value,
    color: localEditForm.color.value,
    size: localEditForm.size.value,
    purpose: localEditForm.purpose.value,
    picture: localEditForm.picture.value,
  });
  
  if (
    localEditForm.name.value === arrOfTds[0].innerHTML &&
    localEditForm.color.value === arrOfTds[1].innerHTML &&
    localEditForm.size.value === arrOfTds[2].innerHTML &&
    localEditForm.purpose.value === arrOfTds[3].innerHTML &&
    localEditForm.picture.value === arrOfTds[4].children[0].src
  ) {
    cancelEdditing()
  }

}

function cancelEdditing() {
  bigAddBtn.removeAttribute("disabled");
  itemEditing.innerHTML = `<td class="user__username">${arrOfTds[0].innerHTML}</td>
      <td>${arrOfTds[1].innerHTML}</td>
      <td>${arrOfTds[2].innerHTML}</td>
      <td>${arrOfTds[3].innerHTML}</td>
      <td><img src="${arrOfTds[4].children[0].src}" alt="Error" class="item_img"></td>
      <td class="btns-wrapper">
      <button class="edit-btns__el common-btn" onclick="editItem('${itemEditing.id}')">Edit</button>
      <button class="edit-btns__el common-btn" onclick="delItem('${itemEditing.id}')">Del</button>
      </td>`
}



// Delete item

function delItem(idOfItem) {
  if (window.confirm("Are you sure?")) {
    db.collection(usersLogin).doc(idOfItem).delete();
  }
}
