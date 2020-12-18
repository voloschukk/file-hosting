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