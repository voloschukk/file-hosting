import React, { Component } from 'react';

export default class UserComponent extends Component {

    render() {
        return (
            <div className="details-main-container">
                <div class="details-items-id">{this.props.usersList.id}</div>
                <div class="details-items-name">{this.props.usersList.name}</div>
                <div class="details-items-email">{this.props.usersList.email}</div>
                <div class="details-items-password">{this.props.usersList.password}</div>
                <div class="details-items-group">{this.props.usersList.group}</div>
                <div class="details-items-edit">
                    <img className="pointer"
                        alt="Edit"
                        src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                        id={this.props.usersList.id.toString()}
                        onClick={this.props.handleEditUser} />
                </div>
                <div class="details-items-delete">
                    <img className="pointer"
                        alt="Delete"
                        src="https://img.icons8.com/ultraviolet/15/000000/waste.png"
                        id={this.props.usersList.id.toString()}
                        onClick={this.props.handleDeleteUser} />
                </div>
            </div>
        )
    }
}
