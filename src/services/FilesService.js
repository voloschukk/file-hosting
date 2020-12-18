export function initFilesData() {
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


export function getFiles(id, tarsh) {
  const files = JSON.parse(localStorage.getItem("files"));
  const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
  let userFilesId = usersAndFiles.filter(item => item.userId === id);
  const userFiles = [];
  for (let i = 0; i < userFilesId.length; i++) {
    let fileId = userFilesId[i].fileId;
    let file = files.find(item => item.id === fileId);
    if (file.trash === tarsh) {
      userFiles.push(file);
    }
  }
  return userFiles;
}

export function deleteFilesToTrash(filesForDelete) {
  const files = JSON.parse(localStorage.getItem("files"));
  for (let i = 0; i < filesForDelete.length; i++) {
    let fileIndex = files.findIndex(item => item.id === filesForDelete[i].id);
    files[fileIndex].trash = true;
  }
  localStorage.setItem("files", JSON.stringify(files));
}

export function restoreFilesFromTrash(filesToRestore) {
  const files = JSON.parse(localStorage.getItem("files"));
  for (let i = 0; i < filesToRestore.length; i++) {
    let fileIndex = files.findIndex(item => item.id === filesToRestore[i].id);
    files[fileIndex].trash = false;
  }
  localStorage.setItem("files", JSON.stringify(files));
}

export function changeFile(file) {
  const files = JSON.parse(localStorage.getItem("files"));
  let fileIndex = files.findIndex(item => item.id === file.id);
  files.splice(fileIndex, 1, file);
  localStorage.setItem("files", JSON.stringify(files));
}

export function addFile(newFile, id) {
  let maxID = 0;
  const files = JSON.parse(localStorage.getItem("files"));
  for (let i = 0; i < files.length; i++) {
    if (maxID <= files[i].id) { maxID = files[i].id + 1 }
  }
  const file = { id: maxID, name: newFile.name, path: '', type: newFile.type, createDate: newFile.lastModifiedDate, creater: id, size: newFile.size, lastModified: newFile.lastModified, trash: false }
  files.push(file);
  localStorage.setItem("files", JSON.stringify(files));

  const usersAndFiles = JSON.parse(localStorage.getItem("usersAndFiles"));
  const userAndFile = { userId: id, fileId: maxID };
  usersAndFiles.push(userAndFile);
  localStorage.setItem("usersAndFiles", JSON.stringify(usersAndFiles));
}

export function setView(view) {
  localStorage.setItem("view", view);
}

export function getView() {
  return localStorage.getItem("view");
}