import React, { Component } from 'react'
import './FileComponent.css';

export default class FileHeaderComponent extends Component {
    render() {
        return (
            <div className="details-main-container file-header">
                <div className="details-items-name">Name</div>
                <div className="details-items-date">Date</div>
                <div className="details-items-creater">Creater</div>
                <div className="details-items-size">Size</div>
            </div>
        )
    }
}
