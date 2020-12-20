export function initUsersData() {
    localStorage.setItem("usersList", JSON.stringify([
        { id: 0, name: '0', email: '0', password: '0', group: 'admin' , access: true},
        { id: 1, name: '1', email: '1', password: '1', group: 'user' , access: true },
        { id: 2, name: '2', email: '2', password: '2', group: 'user' , access: false}]));
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

export function deleteUser(userid) {
    let usersList = JSON.parse(localStorage.getItem("usersList"));
    let deleteUserId = usersList.findIndex((item) => item.id === userid);
    usersList.splice(deleteUserId, 1);
    localStorage.setItem("usersList", JSON.stringify(usersList));
}

export function editUser(user) {
    let usersList = JSON.parse(localStorage.getItem("usersList"));
    let editUserId = usersList.findIndex((item) => item.id === user.id);
    usersList[editUserId] = user;
    localStorage.setItem("usersList", JSON.stringify(usersList));
}

export function addUser(user) {
    let usersList = JSON.parse(localStorage.getItem("usersList"));
    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));
}