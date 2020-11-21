
export function updateDataOnServer(usersList) {
  localStorage.setItem("usersList", JSON.stringify(usersList));
};

export function getDataFromServer() {
  return JSON.parse(localStorage.getItem("usersList"));
}

export function startData() {
  localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' }]));
};