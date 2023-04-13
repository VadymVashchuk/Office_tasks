let allUsers = [
  { login: "User1", password: "1111a" },
  { login: "User2", password: "2222a" },
  { login: "User3", password: "3333a" },
  { login: "User4", password: "4444a" },
];

function userValidation(login, password) {
  isInBase = false;
  for (let userData of allUsers) {
    if (userData.login === login && userData.password === password) {
      isInBase = true;
    }
  }
  return isInBase;
}