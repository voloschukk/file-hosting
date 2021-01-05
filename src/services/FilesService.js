export function initFilesData() {
  localStorage.setItem("view", "tiles");
  localStorage.setItem("files", JSON.stringify([
    { id: 0, name: 'file1', trash: false, path: '', type: 'file', createDate: new Date(), creater: 0, size: 1111111, lastModified: 1 },
    { id: 1, name: 'file2', trash: false, path: '', type: 'file', createDate: new Date(), creater: 1, size: 22222, lastModified: 2 },
    { id: 2, name: 'file3', trash: true, path: '', type: 'file', createDate: new Date(), creater: 2, size: 3333, lastModified: 3 }]));
  localStorage.setItem("usersAndFiles", JSON.stringify([
    { userId: 0, fileId: 0 },
    { userId: 0, fileId: 1 },
    { userId: 1, fileId: 0 },
    { userId: 1, fileId: 1 },
    { userId: 1, fileId: 2 },
    { userId: 2, fileId: 2 }]));

  localStorage.setItem("files0", JSON.stringify([
    { id: 0, name: 'root', parent: null, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 0, size: 0, lastModified: 1 },
    { id: 1, name: 'folder1', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 0, size: 0, lastModified: 1 },
    { id: 2, name: 'folder2', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 0, size: 0, lastModified: 2 },
    { id: 3, name: 'folder3', parent: 1, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 0, size: 0, lastModified: 3 },
    { id: 4, name: 'folder4', parent: 1, trash: true, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 0, size: 0, lastModified: 4 },
    { id: 5, name: 'file1', parent: 0, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 0, size: 1111111, lastModified: 1 },
    { id: 6, name: 'file2', parent: 1, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 0, size: 22222, lastModified: 2 },
    { id: 7, name: 'file3', parent: 0, trash: true, path: '', type: 'file', type2: '', createDate: new Date(), creater: 0, size: 3333, lastModified: 3 }]));
  localStorage.setItem("files1", JSON.stringify([
    { id: 0, name: 'root', parent: null, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 1, size: 0, lastModified: 1 },
    { id: 1, name: 'folder1', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 1, size: 0, lastModified: 1 },
    { id: 2, name: 'folder2', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 1, size: 0, lastModified: 2 },
    { id: 3, name: 'folder3', parent: 1, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 1, size: 0, lastModified: 3 },
    { id: 4, name: 'folder4', parent: 1, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 1, size: 0, lastModified: 4 },
    { id: 5, name: 'file1', parent: 1, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 1, size: 1111111, lastModified: 1 },
    { id: 6, name: 'file2', parent: 1, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 1, size: 22222, lastModified: 2 },
    { id: 7, name: 'file3', parent: 1, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 1, size: 3333, lastModified: 3 }]));
  localStorage.setItem("files2", JSON.stringify([
    { id: 0, name: 'root', parent: null, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 2, size: 0, lastModified: 1 },
    { id: 1, name: 'folder1', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 2, size: 0, lastModified: 1 },
    { id: 2, name: 'folder2', parent: 0, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 2, size: 0, lastModified: 2 },
    { id: 3, name: 'folder3', parent: 1, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 2, size: 0, lastModified: 3 },
    { id: 4, name: 'folder4', parent: 1, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), creater: 2, size: 0, lastModified: 4 },
    { id: 5, name: 'file1', parent: 3, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 2, size: 1111111, lastModified: 1 },
    { id: 6, name: 'file2', parent: 3, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 2, size: 22222, lastModified: 2 },
    { id: 7, name: 'file3', parent: 3, trash: false, path: '', type: 'file', type2: '', createDate: new Date(), creater: 2, size: 3333, lastModified: 3 }]));


}


// export function getFiles(id, tarsh) {
//   const files = JSON.parse(localStorage.getItem("files"));
//   const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
//   let userFilesId = usersAndFiles.filter(item => item.userId === id);
//   const userFiles = [];
//   for (let i = 0; i < userFilesId.length; i++) {
//     let fileId = userFilesId[i].fileId;
//     let file = files.find(item => item.id === fileId && item.trash === tarsh);
//     if (file !== undefined) { userFiles.push(file); }
//   }
//   return userFiles;
// }

export function getFiles(id, tarsh) {
  const files = JSON.parse(localStorage.getItem("files" + id));
  let userFiles = files.filter(item => item.trash === tarsh);
  return userFiles;
}

export function deleteFilesToTrash(id, filesForDelete) {
  const files = JSON.parse(localStorage.getItem("files" + id));
  for (let i = 0; i < filesForDelete.length; i++) {
    let fileIndex = files.findIndex(item => item.id === filesForDelete[i].id);
    if (fileIndex !== -1) { files[fileIndex].trash = true; }
  }
  localStorage.setItem("files" + id, JSON.stringify(files));
}

export function restoreFilesFromTrash(id, filesToRestore) {
  const files = JSON.parse(localStorage.getItem("files" + id));
  for (let i = 0; i < filesToRestore.length; i++) {
    let fileIndex = files.findIndex(item => item.id === filesToRestore[i].id);
    if (fileIndex !== -1) { files[fileIndex].trash = false; }
  }
  localStorage.setItem("files" + id, JSON.stringify(files));
}

export function changeFile(id, file) {
  const files = JSON.parse(localStorage.getItem("files" + id));
  let fileIndex = files.findIndex(item => item.id === file.id);
  files.splice(fileIndex, 1, file);
  localStorage.setItem("files" + id, JSON.stringify(files));
}

export function addFile(id, activeFolder, newFile, type) {
  // add new file to "files" 
  const files = JSON.parse(localStorage.getItem("files" + id));
  let nextID = files.reduce((result, current) => (result <= current.id) ? current.id : result, 0) + 1;
  const file = { id: nextID, name: newFile.name, parent: activeFolder, path: '', type: type, type2: newFile.type, createDate: newFile.lastModifiedDate, creater: id, size: newFile.size, lastModified: newFile.lastModified, trash: false }
  files.push(file);
  localStorage.setItem("files" + id, JSON.stringify(files));

  // add new file to "usersAndFiles" 
  // const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
  // const userAndFile = { userId: id, fileId: nextID };
  // usersAndFiles.push(userAndFile);
  // localStorage.setItem("usersAndFiles", JSON.stringify(usersAndFiles));
}

export function setView(view) {
  localStorage.setItem("view", view);
}

export function getView() {
  return localStorage.getItem("view");
}