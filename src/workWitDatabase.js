
export function getDataFromServer() {
  return JSON.parse(localStorage.getItem("usersList"));
}

// ============================================================================

export let promiseStartData = new Promise(function (resolve, reject) {
  //alert('promiseStartData');
  resolve(localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
  { id: 1, name: '1', email: '1', password: '1', group: 'user' },
  { id: 2, name: '2', email: '2', password: '2', group: 'admin' }])));

});

export let getUsers = () => {
  return new Promise(function (resolve, reject) {
    resolve(localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
    { id: 1, name: '1', email: '1', password: '1', group: 'user' },
    { id: 2, name: '2', email: '2', password: '2', group: 'admin' }])));
  })
}

export let promiseGetDataFromServer = new Promise(function (resolve, reject) {  // use here like getUsers and rename it to getUsers
  //alert('promiseGetDataFromServer');
  resolve(JSON.parse(localStorage.getItem("usersList")));

});

export function promiseUpdateDataOnServer(usersList) {  // rename to addUser 
  return new Promise(function (resolve, reject) {
    //alert('promiseUpdateDataOnServer');
    resolve(localStorage.setItem("usersList", JSON.stringify(usersList)));
  });
}