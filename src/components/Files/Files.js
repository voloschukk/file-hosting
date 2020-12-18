import './Files.css';
import React, { Component } from 'react'
import { getFiles, changeFile, addFile, setView, getView, deleteFilesToTrash, restoreFilesFromTrash } from '../../services/FilesService'
import File from './File'
import FileHeader from './FileHeader'
import DragAndDrop from './DragAndDrop'

export default class Files extends Component {

    constructor(props) {
        super(props);
        this.onSelectFileHandler = this.onSelectFileHandler.bind(this);
        this.changeView = this.changeView.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.restoreFile = this.restoreFile.bind(this);
        this.checkAllFiles = this.checkAllFiles.bind(this);
    }

    state = {
        files: [],
        isTrash: this.props.isTrash,
        view: getView(),
        allCheked: false
    }



    componentDidMount() {
        console.log('---Files componentDidMount');
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.props.isTrash), view: getView(), isTrash: this.props.isTrash, allCheked: false })
    }

    componentDidUpdate(prevProps) {
        console.log('---Files componentDidUpdate');
        if (prevProps.isTrash !== this.props.isTrash) {
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.props.isTrash), view: getView(), isTrash: this.props.isTrash, allCheked: false })
        }
    }

    getFilesWithChecked(userId, isTrash) {
        let files = getFiles(userId, isTrash);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                files[i].checked = false;
            }
        }
        return files;
    }

    checkFile(id, checked) {
        let files = this.state.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].id === Number(id)) { files[i].checked = checked; }
        }
        this.setState({ files: files });
    }

    checkAllFiles(event) {
        let files = this.state.files;
        for (let i = 0; i < files.length; i++) {
            files[i].checked = event.target.checked;
        }
        this.setState({ files: files, allCheked: event.target.checked });
    }

    renameFile(file) {
        changeFile(file);
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }

    onSelectFileHandler = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            addFile(files[i], this.props.user.id);
        }
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }

    handleDrop = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            addFile(files[i], this.props.user.id);
        }
        this.setState({ files: this.getFilesWithChecked(this.props.user.id, false) });
    }

    changeView(event) {
        if (event.target.name !== this.state.view) {
            setView(event.target.name);
            this.setState({ view: event.target.name });
        }
    }

    deleteFile() {
        let files = this.state.files;
        let filesToDelete = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].checked === true) {
                filesToDelete.push(files[i]);
            }
        }
        if (filesToDelete) {
            deleteFilesToTrash(filesToDelete);
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.state.isTrash), allCheked: false });
        }
    }

    restoreFile() {
        let files = this.state.files;
        let filesToRestore = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].checked === true) { filesToRestore.push(files[i]); }
        }
        if (filesToRestore) {
            restoreFilesFromTrash(filesToRestore);
            this.setState({ files: this.getFilesWithChecked(this.props.user.id, this.state.isTrash), allCheked: false });
        }
    }

    render() {
        const { files } = this.state;
        let filesItems = [];
        if (files) {
            filesItems = files.map((files) =>
                <File file={files} view={this.state.view} enableRenameFile={this.props.enableRenameFile} renameFile={(file) => this.renameFile(file)} checkFile={(id, checked) => this.checkFile(id, checked)} />
            );
        }
        else {
        }

        const filesGrid = this.state.view === "tiles" ? "files-grid-tiles" : "files-grid-details";

        return (
            <div className="container user-data">
                <div className="row control-row">
                    <div className="col col-1 flex-centre">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={this.checkAllFiles} checked={this.state.allCheked} id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">All</label>
                        </div>
                    </div>
                    <div className="col col-7 flex-centre">
                        {this.props.enableAddFile && <div className="input-group">
                            <div className="custom-file">
                                <input type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    multiple="multiple"
                                    onChange={(e) => this.onSelectFileHandler(e.target.files)} />
                                <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                            </div>
                        </div>}
                    </div>
                    <div className="col col-2 flex-centre">
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">View</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="btn dropdown-item" name="tiles" onClick={this.changeView}>Tiles {this.state.view === "tiles" && <img alt="" src="https://img.icons8.com/ultraviolet/15/000000/checkmark--v1.png"/>} </button>
                                <button className="btn dropdown-item" name="details" onClick={this.changeView}>Details {this.state.view === "details" && <img alt="" src="https://img.icons8.com/ultraviolet/15/000000/checkmark--v1.png"/>}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-2 flex-centre">
                        {!this.state.isTrash && <button className="btn btn-primary" onClick={this.deleteFile}>Delete</button>}
                        {this.state.isTrash && <button className="btn btn-primary" onClick={this.restoreFile}>Restore</button>}
                    </div>
                </div>
                <div className="row data-row">
                    {this.props.enableAddFile &&
                        <DragAndDrop handleDrop={this.handleDrop}>
                            <div className={filesGrid}>
                                {this.state.view === "details" && <FileHeader />}
                                {filesItems}
                            </div>
                        </DragAndDrop>}
                    {!this.props.enableAddFile &&
                        <div className={filesGrid}>
                            {this.state.view === "details" && <FileHeader />}
                            {filesItems}
                        </div>}
                </div>
            </div>
        )
    }
}
