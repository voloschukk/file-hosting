export function startData() {
    localStorage.setItem("usersList", JSON.stringify([
      { id: 0, name: 'user0', email: 'user0@gmail.com', password: 'password0', group: 'admin' },
      { id: 1, name: '1', email: '1', password: '1', group: 'user' },
      { id: 2, name: '2', email: '2', password: '2', group: 'admin' }]));
    localStorage.setItem("files", JSON.stringify([
      { id: 0, name: 'file1', trash: false, path: '', type: '', createDate: new Date(), creater: 0, size: 1111111, lastModified: 1 },
      { id: 1, name: 'file2', trash: false, path: '', type: '', createDate: new Date(), creater: 1, size: 22222, lastModified: 2 },
      { id: 2, name: 'file3', trash: true, path: '', type: '', createDate: new Date(), creater: 2, size: 3333, lastModified: 3 }]));
    localStorage.setItem("usersAndFiles", JSON.stringify([
      { userId: 0, fileId: 0 },
      { userId: 0, fileId: 1 },
      { userId: 1, fileId: 0 },
      { userId: 1, fileId: 1 },
      { userId: 1, fileId: 2 },
      { userId: 2, fileId: 2 }]));
    localStorage.setItem("view", "tiles")
  }

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