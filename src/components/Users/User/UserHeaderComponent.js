import './UserComponent.css';
import React, { Component } from 'react'

export default class UserHeaderComponent extends Component {
    render() {
        return (
            <div className="user-main-container file-header">
                <div className="user-items-id">Id</div>
                <div className="user-items-access">AC</div>
                <div className="user-items-name">Name</div>
                <div className="user-items-email">Email</div>
                <div className="user-items-password">Password</div>
                <div className="user-items-group">Group</div>
                <div className="user-items-edit">Edit</div>
                <div className="user-items-delete">Del</div>
            </div>
        )
    }
}