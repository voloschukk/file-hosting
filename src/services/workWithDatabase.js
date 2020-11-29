export function getDataFromServer() {
  return JSON.parse(localStorage.getItem("usersList"));
}

export function getFilesFromServer(id) {
  const files = JSON.parse(localStorage.getItem("files"));
  const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
  let userFilesId = usersAndFiles.filter(item => item.userId === id);
  const userFiles = [];
  for (let i = 0; i < userFilesId.length; i++) {
    let fileId = userFilesId[i].fileId;
    let file = files.find(item => item.id === fileId);
    userFiles.push(file);
  }
  return userFiles;
}

export function changeFileInServer(file) {
  const files = JSON.parse(localStorage.getItem("files"));
  let fileIndex = files.findIndex(item => item.id === file.id);
  files.splice(fileIndex, 1, file);
  localStorage.setItem("files", JSON.stringify(files));
}

export function addFileInServer(newFileName, id) {

  let maxID = 0;
  const files = JSON.parse(localStorage.getItem("files"));
  for (let i = 0; i < files.length; i++) {
    if (maxID <= files[i].id) { maxID = files[i].id + 1 }
  }
  const file = { id: maxID, name: newFileName, path: '', type: '', createDate: new Date(), creater: id }
  files.push(file);
  localStorage.setItem("files", JSON.stringify(files));

  const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
  const userAndFile = { userId: id, fileId: maxID };
  usersAndFiles.push(userAndFile);
  localStorage.setItem("usersAndFiles", JSON.stringify(usersAndFiles));
}

export function startData() {
  localStorage.setItem("usersList", JSON.stringify([
    { id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
    { id: 1, name: '1', email: '1', password: '1', group: 'user' },
    { id: 2, name: '2', email: '2', password: '2', group: 'admin' }]));
  localStorage.setItem("files", JSON.stringify([
    { id: 0, name: 'file1', path: '', type: '', createDate: new Date(), creater: 0 },
    { id: 1, name: 'file2', path: '', type: '', createDate: new Date(), creater: 1 },
    { id: 2, name: 'file3', path: '', type: '', createDate: new Date(), creater: 2 }]));
  localStorage.setItem("usersAndFiles", JSON.stringify([
    { userId: 0, fileId: 0 },
    { userId: 0, fileId: 1 },
    { userId: 0, fileId: 2 },
    { userId: 1, fileId: 0 },
    { userId: 1, fileId: 1 },
    { userId: 2, fileId: 2 }]));
}

// ============================================================================

export let promiseStartData = new Promise(function (resolve, reject) {
  //alert('promiseStartData');
  resolve(
    // localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
    // { id: 1, name: '1', email: '1', password: '1', group: 'user' },
    // { id: 3, name: '2', email: '2', password: '2', group: 'admin' }]));
    // localStorage.setItem("files", JSON.stringify([{ id: 0, name: 'file1', path: '', type: '', createDate: new Date(), creater: 0, usersAccessId: [0,1,2] },
    // { id: 1, name: 'file2', path: '', type: '', createDate: new Date(), creater: 1, usersAccess: [0,1] },
    // { id: 2, name: 'file3', path: '', type: '', createDate: new Date(), creater: 2, usersAccess: [2] }]));

  );

});

export let getUsers = () => {
  return new Promise(function (resolve, reject) {
    resolve(localStorage.setItem("usersList", JSON.stringify([{ id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
    { id: 1, name: '1', email: '1', password: '1', group: 'user' },
    { id: 5, name: '2', email: '2', password: '2', group: 'admin' }])));
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