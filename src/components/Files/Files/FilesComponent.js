import './FilesComponent.css';
import React, { Component } from 'react'
import { getFiles, changeFile, addFile, setView, getView, deleteFilesToTrash, restoreFilesFromTrash } from '../../../services/FilesService'
import FileComponent from '../File/FileComponent'
import FileHeaderComponent from '../File/FileHeaderComponent'
import DragAndDropComponent from '../DragAndDrop/DragAndDropComponent'
import { setCookie, deleteCookie, getCookie } from '../../../services/CookieService';
import { texts } from '../../../services/LanguageService';

export default class FilesComponent extends Component {

    constructor(props) {
        super(props);
        this.onSelectFileHandler = this.onSelectFileHandler.bind(this);
        this.changeView = this.changeView.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.restoreFile = this.restoreFile.bind(this);
        this.checkAllFiles = this.checkAllFiles.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.chageActiveFolder = this.chageActiveFolder.bind(this);
        this.goBackFolder = this.goBackFolder.bind(this);
        this.addFolder = this.addFolder.bind(this);
    }

    state = {
        files: [],
        folders: [],
        activeFolder: 0,
        isTrash: this.props.isTrash,
        view: getView(),
        allCheked: false,
        sortBy: "name",
        sortDirection: "ascending"
    }

    componentDidMount() {
        console.log('---Files componentDidMount');
        let ev = { target: { name: "name" } };
        this.changeSort(ev);
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.props.isTrash), view: getView(), isTrash: this.props.isTrash, allCheked: false })
    }

    componentDidUpdate(prevProps, prevState) {

        console.log('---Files componentDidUpdate');
        if (prevProps.isTrash !== this.props.isTrash) {
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.props.isTrash), view: getView(), isTrash: this.props.isTrash, allCheked: false })
        }
        if (JSON.stringify(prevState.files) !== JSON.stringify(this.state.files)) {
            this.changeSort({ target: { name: this.state.sortBy } });
            this.changeSort({ target: { name: this.state.sortDirection } });
        }
        if (prevState.activeFolder !== this.state.activeFolder) {
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.props.isTrash), view: getView(), isTrash: this.props.isTrash, allCheked: false })
        }
    }

    getFilesWithChecked(userId, isTrash) {
        let files = [];
        if (!isTrash) files = getFiles(userId, isTrash).filter(item => item.parent === this.state.activeFolder);
        if (isTrash) files = getFiles(userId, isTrash);

        if (files) {
            files.forEach(item => item.checked = false)
        }

        return files;
    }

    checkFile(id, checked) {
        let files = this.state.files;
        files.forEach((file) => { if (file.id === Number(id)) { file.checked = checked; } });
        this.setState({ files: files });
    }

    checkAllFiles(event) {
        let files = this.state.files;
        files.forEach((file) => file.checked = event.target.checked);
        this.setState({ files: files, allCheked: event.target.checked });
    }

    renameFile(file) {
        changeFile(this.props.user.id, file);
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }

    onSelectFileHandler(files) {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            addFile(this.props.user.id, this.state.activeFolder, files[i], "file");
        }
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }

    changeView(event) {
        if (event.target.name !== this.state.view && event.target.nodeName !== "IMG") {
            setView(event.target.name);
            this.setState({ view: event.target.name });
        }
    }

    changeSort(event, necessary = false) {
        
        if (event.target.nodeName !== "IMG") {

            let files = this.state.files;


            let sortDirection = this.state.sortDirection;
            let sortBy = this.state.sortBy;

            if (event.target.name === "ascending" || event.target.name === "descending") {
                sortDirection = event.target.name;
            }
            else {
                sortBy = event.target.name;
            }

            files.sort((a, b) => {
                if (a[sortBy] > b[sortBy]) return 1;
                if (a[sortBy] == b[sortBy]) return 0;
                if (a[sortBy] < b[sortBy]) return -1;
            })
            if (sortDirection === "descending") {
                files.reverse();
            }

            files.sort((a, b) => {
                if (a["type"] < b["type"]) return 1;
                if (a["type"] == b["type"]) return 0;
                if (a["type"] > b["type"]) return -1;
            })

            this.setState({ files: files, sortDirection: sortDirection, sortBy: sortBy });
        }
    }

    deleteFile() {
        let files = this.state.files;
        let filesToDelete = files.filter(item => item.checked === true);
        if (filesToDelete.length > 0) {
            deleteFilesToTrash(this.props.user.id, filesToDelete);
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.state.isTrash), allCheked: false });
        }
    }

    restoreFile() {
        let files = this.state.files;
        let filesToRestore = files.filter(item => item.checked === true);
        if (filesToRestore.length > 0) {
            restoreFilesFromTrash(this.props.user.id, filesToRestore);
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.state.isTrash), allCheked: false });
        }
    }

    chageActiveFolder(id) {
        if (!this.props.isTrash) {
            this.setState({ activeFolder: Number(id) })
        }
    }

    goBackFolder() {
        if (this.state.activeFolder !== 0) {
            let files = getFiles(this.props.user.id, this.props.isTrash).find(item => item.id === this.state.activeFolder);
            let parentFolder = files.parent;
            this.setState({ activeFolder: parentFolder });
        }
    }

    getParent(folderId) {

        if (folderId === 0) {
            return "../";
        }
        else {
            return this.getParent(getFiles(this.props.user.id, this.props.isTrash).find(item => item.id === folderId).parent) + " " + getFiles(this.props.user.id, this.props.isTrash).find(item => item.id === folderId).name.toString() + " /"
        }
    }

    addFolder() {
        let file = { id: null, name: 'new folder', parent: this.state.activeFolder, trash: false, path: '', type: 'folder', type2: '', createDate: new Date(), lastModifiedDate: new Date(), creater: 0, size: 0, lastModified: 1 }

        addFile(this.props.user.id, this.state.activeFolder, file, 'folder');
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }


    render() {

        let translation = texts()[getCookie("language")];

        const { files } = this.state;
        let filesItems = [];
        if (files) {
            filesItems = files.map((files) =>
                <FileComponent
                    file={files}
                    view={this.state.view}
                    enableRenameFile={this.props.enableRenameFile}
                    renameFile={(file) => this.renameFile(file)}
                    checkFile={(id, checked) => this.checkFile(id, checked)}
                    chageActiveFolder={(id) => this.chageActiveFolder(id)}

                />
            );
        }

        let path = "_";
        if (this.props.enablePath) path = this.getParent(this.state.activeFolder);

        let mark = <img alt="!" src="https://img.icons8.com/ultraviolet/15/000000/checkmark--v1.png" onclick="return false" />;

        const filesGrid = this.state.view === "tiles" ? "files-grid-tiles" : "files-grid-details";

        return (
            <div className="container user-data">
                <div className="row control-row">
                    <div className="col col-1 flex-centre">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={this.checkAllFiles} checked={this.state.allCheked} id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">{translation.ALL}</label>
                        </div>
                    </div>
                    <div className="col col-1 flex-centre">
                        {this.props.enablePath && <button class="btn btn-outline-primary" type="button" title={translation.UP} onClick={this.goBackFolder}>
                            <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/upload-to-ftp.png" />
                        </button>}
                    </div>
                    <div className="col col-1 flex-centre">
                        {this.props.enablePath && <button class="btn btn-outline-primary" type="button" title={translation.NEW_FOLDER} onClick={this.addFolder}>
                            <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/add-folder.png" />
                        </button>}
                    </div>

                    <div className="col col-6 flex-centre">
                        {this.props.enableAddFile && <div className="input-group">
                            <div className="custom-file">
                                <input type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    multiple="multiple"
                                    onChange={(e) => this.onSelectFileHandler(e.target.files)} />
                                <label className="custom-file-label" for="inputGroupFile01">{translation.CHOOSE_FILE}</label>
                            </div>
                        </div>}
                    </div>
                    <div className="col col-1 flex-centre">
                        <div className="dropdown dropleft">
                            <button className="btn btn-outline-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" title={translation.SORT} aria-haspopup="true" aria-expanded="false">
                                {this.state.sortDirection === "ascending" && <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/generic-sorting-2.png" />}
                                {this.state.sortDirection === "descending" && <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/generic-sorting.png" />}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="btn dropdown-item" name="name" onClick={this.changeSort}>{translation.NAME}
                                    {this.state.sortBy === "name" && mark}
                                </button>
                                <button className="btn dropdown-item" name="createDate" onClick={this.changeSort}>{translation.DATE}
                                    {this.state.sortBy === "createDate" && mark}
                                </button>
                                <button className="btn dropdown-item" name="creater" onClick={this.changeSort}>{translation.CREATER}
                                    {this.state.sortBy === "creater" && mark}
                                </button>
                                <button className="btn dropdown-item" name="size" onClick={this.changeSort}>{translation.SIZE}
                                    {this.state.sortBy === "size" && mark}
                                </button>
                                <div class="dropdown-divider"></div>
                                <button className="btn dropdown-item" name="ascending" onClick={this.changeSort}>{translation.ASCENDING}
                                    {this.state.sortDirection === "ascending" && mark}
                                </button>
                                <button className="btn dropdown-item" name="descending" onClick={this.changeSort}>{translation.DESCENDING}
                                    {this.state.sortDirection === "descending" && mark}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-1 flex-centre">
                        <div className="dropdown dropleft">
                            <button className="btn btn-outline-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" title={translation.VIEW} aria-haspopup="true" aria-expanded="false">
                                {this.state.view === "tiles" && <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/thumbnails.png" />}
                                {this.state.view === "details" && <img alt="view" src="https://img.icons8.com/ultraviolet/20/000000/details.png" />}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="btn dropdown-item" name="tiles" onClick={this.changeView}>{translation.TILES} {this.state.view === "tiles" && mark} </button>
                                <button className="btn dropdown-item" name="details" onClick={this.changeView}>{translation.DETAILS} {this.state.view === "details" && mark}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-1 flex-centre">
                        {!this.state.isTrash &&
                            <button className="btn btn-outline-primary" onClick={this.deleteFile} title={translation.DELETE}>
                                <img alt="delete" src="https://img.icons8.com/ultraviolet/20/000000/delete--v1.png" />
                            </button>}
                        {this.state.isTrash &&
                            <button className="btn btn-outline-primary" onClick={this.restoreFile} title={translation.RESTORE}>
                                <img alt="restore" src="https://img.icons8.com/ultraviolet/20/000000/upload--v1.png" />
                            </button>}
                    </div>
                </div>
                <div className="row path-row">
                    {path}
                </div>
                <div className="row data-row">
                    {this.props.enableAddFile &&
                        <DragAndDropComponent handleDrop={this.onSelectFileHandler}>
                            <div className={filesGrid}>
                                {this.state.view === "details" && <FileHeaderComponent />}
                                {filesItems}
                            </div>
                        </DragAndDropComponent>}
                    {!this.props.enableAddFile &&
                        <div className={filesGrid}>
                            {this.state.view === "details" && <FileHeaderComponent />}
                            {filesItems}
                        </div>}
                </div>
            </div>
        )
    }
}
