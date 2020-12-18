export function initUsersData() {
    localStorage.setItem("usersList", JSON.stringify([
        { id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
        { id: 1, name: '1', email: '1', password: '1', group: 'user' },
        { id: 2, name: '2', email: '2', password: '2', group: 'admin' }]));
}

export function getUsersData() {
    return JSON.parse(localStorage.getItem("usersList"));
}


export let promiseGetUsersData = new Promise(function (resolve, reject) {
    resolve(JSON.parse(localStorage.getItem("usersList")));

});

export function promiseUpdateUsersData(usersList) {
    return new Promise(function (resolve, reject) {
        resolve(localStorage.setItem("usersList", JSON.stringify(usersList)));
    });
}