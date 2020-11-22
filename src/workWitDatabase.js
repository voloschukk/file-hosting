
export function getDataFromServer() {
  return JSON.parse(localStorage.getItem("usersList"));
}

// ============================================================================

export let promiseStartData = new Promise(function(resolve, reject) {
  alert('promiseStartData');
  resolve(localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' }])));

});

export let promiseGetDataFromServer = new Promise(function(resolve, reject) {
  alert('promiseGetDataFromServer');
  resolve(JSON.parse(localStorage.getItem("usersList")));

});

export function promiseUpdateDataOnServer(usersList) {
  return new Promise(function(resolve, reject) {
    alert('promiseUpdateDataOnServer');
    resolve(localStorage.setItem("usersList", JSON.stringify(usersList)));
  });
}