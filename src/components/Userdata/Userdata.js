import './Userdata.css';
import React, { Component } from 'react'
import { getFilesFromServer, changeFileInServer, addFileInServer, setView, getView, deleteFilesToTrash, restoreFilesFromTrash } from '../../services/workWithDatabase'
import File from './File'
import FileHeader from './FileHeader'
import DragAndDrop from './DragAndDrop'

export default class Userdata extends Component {
    constructor(props) {
        super(props);
        this.state = { files: getFilesFromServer(this.props.user.id, this.props.trash), view: getView(), checkedFilesID: [] };
        this.onSelectFileHandler = this.onSelectFileHandler.bind(this);
        this.changeView = this.changeView.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.restoreFile = this.restoreFile.bind(this);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    };

    checkFile(id, checked) {
        let checkedFilesID = this.state.checkedFilesID;
        if (checked) {
            checkedFilesID.push(Number(id));
        }
        else {
            checkedFilesID.splice(checkedFilesID.indexOf(Number(id)), 1);
        }

        this.setState({ checkedFilesID: checkedFilesID });
        console.log('ch', this.state.checkedFilesID);

    }

    renameFile(file) {
        changeFileInServer(file);
        this.setState({ files: getFilesFromServer(this.props.user.id, this.props.trash) });
    }

    onSelectFileHandler = (files) => {
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            addFileInServer(files[i], this.props.user.id);
        }
        this.setState({ files: getFilesFromServer(this.props.user.id, this.props.trash) });
    }

    handleDrop = (files) => {
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            addFileInServer(files[i], this.props.user.id);
        }
        this.setState({ files: getFilesFromServer(this.props.user.id, this.props.trash) });
    }

    changeView(event) {
        if (event.target.name === this.state.view) {
            return
        }
        else {
            setView(event.target.name);
            this.setState({ view: event.target.name });
        };
    }

    deleteFile() {
        let checkedFilesID = this.state.checkedFilesID;
        if (checkedFilesID.length > 0) {
            deleteFilesToTrash(checkedFilesID);
            this.setState({ files: getFilesFromServer(this.props.user.id, this.props.trash), checkedFilesID: [] });
        }
    }

    restoreFile() {
        let checkedFilesID = this.state.checkedFilesID;
        if (checkedFilesID.length > 0) {
            restoreFilesFromTrash(checkedFilesID);
            this.setState({ files: getFilesFromServer(this.props.user.id, this.props.trash), checkedFilesID: [] });
        }
    }



    render() {

        const files = this.state.files;

        const filesItems = files.map((files) =>
            <File file={files} view={this.state.view} trash={this.props.trash} renameFile={(file) => this.renameFile(file)} checkFile={(id, checked) => this.checkFile(id, checked)} />
        );

        const filesGrid = this.state.view === "tiles" ? "files-grid-tiles" : "files-grid-details";

        return (
            <div className="container user-data">
                <div className="row control-row">
                    <div className="col col-8">
                        {!this.props.trash && <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file"
                                    className="custom-file-input"
                                    disabled={this.props.trash}
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    multiple="multiple"
                                    onChange={(e) => this.onSelectFileHandler(e.target.files)} />
                                <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                            </div>
                        </div>}
                    </div>
                    <div className="col col-2">
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">View</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="btn dropdown-item" name="tiles" onClick={this.changeView}>Tiles</button>
                                <button className="btn dropdown-item" name="details" onClick={this.changeView}>Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                    {!this.props.trash && <button className="btn btn-primary" onClick={this.deleteFile}>Delete</button>}
                    {this.props.trash && <button className="btn btn-primary" onClick={this.restoreFile}>Restore</button>}
                    </div>
                </div>
                <div className="row data-row">

                    {!this.props.trash &&
                        <DragAndDrop handleDrop={this.handleDrop}>
                            <div className={filesGrid}>
                                {this.state.view === "details" && <FileHeader />}
                                {filesItems}
                            </div>
                        </DragAndDrop>}
                    {this.props.trash &&
                        <div className={filesGrid}>
                            {this.state.view === "details" && <FileHeader />}
                            {filesItems}
                        </div>}


                </div>

            </div>




        )
    }
}
