import './UserComponent.css';
import React, { Component } from 'react'

export default class UserHeaderComponent extends Component {
    render() {
        return (
            <div className="details-main-container file-header">
                <div className="details-items-id">Id</div>
                <div className="details-items-name">Name</div>
                <div className="details-items-email">Email</div>
                <div className="details-items-password">Password</div>
                <div className="details-items-group">Group</div>
                <div className="details-items-edit">Edit</div>
                <div className="details-items-delete">Delete</div>
            </div>
        )
    }
}