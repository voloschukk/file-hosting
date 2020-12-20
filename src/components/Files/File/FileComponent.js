import './FileComponent.css';
import React, { Component } from 'react'

export default class FileComponent extends Component {

    constructor(props) {
        super(props);
        this.editFileName = this.editFileName.bind(this);
        this.renameFile = this.renameFile.bind(this);
        this.cancelEditFile = this.cancelEditFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkFile = this.checkFile.bind(this);
    }

    state = {
        fileName: this.props.file.name,
        file: this.props.file,
        renameFileId: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            this.setState({ fileName: this.props.file.name, file: this.props.file, renameFileId: '' })
        }
    }

    editFileName(event) {
        let id = event.target.id;
        this.setState({ renameFileId: id });
    }

    checkFile(event) {
        this.props.checkFile(event.target.id, event.target.checked);
    }

    renameFile() {
        let file = this.state.file;
        file.name = this.state.fileName;
        this.setState({ renameFileId: '' });
        this.props.renameFile(file);
    }

    cancelEditFile() {
        this.setState({ fileName: this.state.file.name, renameFileId: '' });
    }

    handleChange(event) {
        this.setState({ fileName: event.target.value });
    }

    render() {

        const file = this.state.file;
        var fileName, nameLength, fileSize;

        // ----- transform fileName
        if (this.props.view === "tiles") { nameLength = 12; }
        if (this.props.view === "details") { nameLength = 30; }

        if (file.name.length < nameLength) {
            fileName = file.name;
        }
        else {
            fileName = file.name.slice(0, nameLength) + "...";
        }

        // ----- transform fileDate
        const fileDate = file.createDate.slice(0, 10)

        // ----- transform fileSize
        fileSize = file.size;
        let prefix = 0;
        while (fileSize / 1024 > 1) {
            fileSize = fileSize / 1024;
            prefix++;
        };
        if (prefix === 0) { fileSize = fileSize.toFixed(1) + " B" }
        if (prefix === 1) { fileSize = fileSize.toFixed(1) + " KB" }
        if (prefix === 2) { fileSize = fileSize.toFixed(1) + " MB" }
        if (prefix === 3) { fileSize = fileSize.toFixed(1) + " GB" }

        return (
            <>
                {this.props.view === "tiles" &&
                    <div className="tiles-main-container">
                        <input class="tiles-form-check" type="checkbox" id={file.id} onChange={this.checkFile} checked={file.checked} />
                        <div className="tiles-icon">
                            <img className="m-2" alt="File" src="https://img.icons8.com/ultraviolet/40/000000/document--v2.png" />
                        </div>
                        {this.state.renameFileId.toString() !== file.id.toString() &&
                            <div className="tiles-name-row-noedit">
                                <div className="tiles-file-name">
                                    {fileName}
                                </div>
                                {this.props.enableRenameFile && <div>
                                    <img className="pointer"
                                        alt="Edit"
                                        src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                                        id={file.id}
                                        onClick={this.editFileName} />
                                </div>}
                            </div>}
                        {this.state.renameFileId.toString() === file.id.toString() &&
                            <div className="tiles-name-row-edit">
                                <input type="text" className="form-control form-control-sm input-name" name="fileName" value={this.state.fileName} onChange={this.handleChange} id={file.id} />
                                <img className="pointer"
                                    alt="Save"
                                    src="https://img.icons8.com/ultraviolet/20/000000/checked--v1.png"
                                    id={file.id}
                                    onClick={this.renameFile} />
                                <img className="pointer"
                                    alt="Cancel"
                                    src="https://img.icons8.com/ultraviolet/20/000000/cancel.png"
                                    id={file.id}
                                    onClick={this.cancelEditFile} />
                            </div>}
                    </div>
                }
                {this.props.view === "details" &&
                    <div className="details-main-container">
                        <input class="details-form-check" type="checkbox" id={file.id} onChange={this.checkFile} checked={file.checked} />
                        {this.state.renameFileId.toString() !== file.id.toString() &&
                            <div className="details-items-name">
                                <div className="details-file-name">
                                    {fileName}
                                </div>
                                <div className="">
                                    {this.props.enableRenameFile &&
                                        <img className="pointer ml-2"
                                            alt="Edit"
                                            src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                                            id={file.id}
                                            onClick={this.editFileName} />}
                                </div>
                            </div>
                        }
                        {this.state.renameFileId.toString() === file.id.toString() &&
                            <div className="details-items-name">
                                <div className="details-name-row-edit">
                                    <input type="text" className="details-input-name form-control form-control-sm" name="fileName" value={this.state.fileName} onChange={this.handleChange} id={file.id} />
                                </div>
                                <div>
                                    <img className="pointer"
                                        alt="Save"
                                        src="https://img.icons8.com/ultraviolet/20/000000/checked--v1.png"
                                        id={file.id}
                                        onClick={this.renameFile} />
                                    <img className="pointer"
                                        alt="Cancel"
                                        src="https://img.icons8.com/ultraviolet/20/000000/cancel.png"
                                        id={file.id}
                                        onClick={this.cancelEditFile} />
                                </div>
                            </div>}
                        <div class="details-items-date">{fileDate}</div>
                        <div class="details-items-creater">{file.creater}</div>
                        <div class="details-items-size">{fileSize}</div>
                    </div>
                }
            </>
        )
    }
}
