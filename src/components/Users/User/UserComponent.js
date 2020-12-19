import React, { Component } from 'react';

export default class UserComponent extends Component {

    render() {
        return (
            <div className="user-main-container">
                <div class="user-items-id">{this.props.usersList.id}</div>
                <div class="user-items-access">
                    {this.props.usersList.access &&
                        <img alt="Yes" src="https://img.icons8.com/ultraviolet/15/000000/ok.png" />
                    }
                    {!this.props.usersList.access &&
                        <img alt="No" src="https://img.icons8.com/ultraviolet/15/000000/cancel-2.png" />
                    }
                </div>
                <div class="user-items-name">{this.props.usersList.name}</div>
                <div class="user-items-email">{this.props.usersList.email}</div>
                <div class="user-items-password">{this.props.usersList.password}</div>
                <div class="user-items-group">{this.props.usersList.group}</div>
                <div class="user-items-edit">
                    <img className="pointer"
                        alt="Edit"
                        src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                        id={this.props.usersList.id.toString()}
                        onClick={this.props.handleEditUser} />
                </div>
                <div class="user-items-delete">
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
