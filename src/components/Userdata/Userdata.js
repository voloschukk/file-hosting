import React, { Component } from 'react'
import { getFilesFromServer, changeFileInServer, addFileInServer} from '../../services/workWithDatabase'
import File from './File'

export default class Userdata extends Component {
    constructor(props) {
        super(props);
        this.state = { files: getFilesFromServer(this.props.user.id) , browseFiles: []};
        this.onSelectFileHandler = this.onSelectFileHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renameFile(file) {
        changeFileInServer(file);
        this.setState({ files: getFilesFromServer(this.props.user.id) });
    }

    onSelectFileHandler = (files) => {
        let browseFiles = [];
        for (var i = 0; i < files.length; i++) {
            browseFiles.push(files[i].name);
        }
        this.setState({browseFiles: browseFiles});
    }

    handleSubmit(){
        const browseFiles = this.state.browseFiles;
        for (var i = 0; i < browseFiles.length; i++) {
            addFileInServer(browseFiles[i], this.props.user.id);
        }
        this.setState({files: getFilesFromServer(this.props.user.id), browseFiles: []});
    }


    render() {
        const files = this.state.files;

        const filesItems = files.map((files) =>
            <File file={files} renameFile={(file) => this.renameFile(file)} />
        );

        let browseFiles = this.state.browseFiles.reduce(function(accumulator, currentValue) {
            return currentValue + ", " + accumulator;
          }, "");
        browseFiles =  browseFiles.slice(0, -2)

        return (
            <div>

                <form class="">
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" 
                            class="custom-file-input" 
                            multiple="multiple"
                            onChange={(e) => this.onSelectFileHandler(e.target.files)}
                            required />
                            <label class="custom-file-label" >{browseFiles}</label>
                        </div>
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button" onClick={this.handleSubmit}>Upload</button>
                        </div>
                    </div>
                </form>

                <div class="d-flex align-content-start flex-wrap">
                    {filesItems}
                </div>
            </div>



        )
    }
}
