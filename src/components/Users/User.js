import React, { Component } from 'react';

export default class User extends Component {

    render() {
        return (
            <div>
                {/* <tr>
                    <th scope="row">{this.props.usersList.id}</th>
                    <td>{this.props.usersList.name}</td>
                    <td>{this.props.usersList.email} </td>
                    <td>{this.props.usersList.password}</td>
                    <td>{this.props.usersList.group}</td>
                    <td align="center">
                        <img className="pointer"
                            alt="Edit"
                            src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                            id={this.props.usersList.id.toString()}
                            onClick={this.props.handleEditUser} />
                    </td>
                    <td align="center">
                        <img className="pointer"
                            alt="Delete"
                            src="https://img.icons8.com/ultraviolet/15/000000/waste.png"
                            id={this.props.usersList.id.toString()}
                            onClick={this.props.handleDeleteUser} />
                    </td>
                </tr> */}

                <div class="d-flex flex-row border">
                    <div class="p-2 w-10 border">{this.props.usersList.id}</div>
                    <div class="p-2 flex-fill border">{this.props.usersList.name}</div>
                    <div class="p-2 flex-fill border">{this.props.usersList.email}</div>
                    <div class="p-2 flex-fill border">{this.props.usersList.password}</div>
                    <div class="p-2 flex-fill border">{this.props.usersList.group}</div>
                    <div class="p-2 w-20 border justify-content-center">
                        <img className="pointer"
                            alt="Edit"
                            src="https://img.icons8.com/ultraviolet/15/000000/edit.png"
                            id={this.props.usersList.id.toString()}
                            onClick={this.props.handleEditUser} />
                    </div>
                    <div class="p-2 w-20 border">
                        <img className="pointer"
                            alt="Delete"
                            src="https://img.icons8.com/ultraviolet/15/000000/waste.png"
                            id={this.props.usersList.id.toString()}
                            onClick={this.props.handleDeleteUser} />
                    </div>
                </div>

            </div>
        )
    }
}
