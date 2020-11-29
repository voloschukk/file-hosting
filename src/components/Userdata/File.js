import React, { Component } from 'react'

export default class File extends Component {

    constructor(props) {
        super(props);
        this.state = { fileName: this.props.file.name, file: this.props.file, renameFileId: '' };
        this.editFileName = this.editFileName.bind(this);
        this.renameFile = this.renameFile.bind(this);
        this.cancelEditFile = this.cancelEditFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editFileName(event) {
        let id = event.target.id;
        this.setState({ renameFileId: id });
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

        return (
            <div>
                

                <div className="d-flex flex-column justify-content-center w-40 p-2 bd-highlight border m-2">
                    <div className="d-flex justify-content-center">
                        <img className="m-2" alt="File" src="https://img.icons8.com/ultraviolet/40/000000/document--v2.png" />
                    </div>

                    {this.state.renameFileId.toString() !== file.id.toString() &&
                        <div className="d-flex flex-row align-items-center">
                            <div className="mr-2">
                                {file.name}
                            </div>
                            <div>
                                <img className="h-15 pointer"
                                    alt="Edit"
                                    src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                                    id={file.id}
                                    onClick={this.editFileName} />
                            </div>
                        </div>}
                    {this.state.renameFileId.toString() === file.id.toString() &&
                        <div className="d-flex flex-row align-items-center">
                            <div className="mr-2 w-20">
                                <input type="text" className="form-control form-control-sm" name="fileName" value={this.state.fileName} onChange={this.handleChange} id={file.id} />
                            </div>
                            <div>
                                <img className="pointer m-1"
                                    alt="Save"
                                    src="https://img.icons8.com/ultraviolet/20/000000/checked--v1.png"
                                    id={file.id}
                                    onClick={this.renameFile} />
                                <img className="pointer m-1"
                                    alt="Cancel"
                                    src="https://img.icons8.com/ultraviolet/20/000000/cancel.png"
                                    id={file.id}
                                    onClick={this.cancelEditFile} />
                            </div>
                        </div>}

                </div>
            </div>
        )
    }
}
