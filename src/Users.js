import React, { Component } from 'react'
import MyModal from './MyModal';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { usersList: JSON.parse(localStorage.getItem("usersList")) };
        this.handleEditUser = this.handleEditUser.bind(this);
    }

    state = {
        user: { id: null, name: '', email: '', password: '', group: 'user' },
        showModal: false,
        addNewUser: false
    }

    handleAddUser = () => {
        console.log('---- handleAddUser', 1)
        let id = 0;
        for (let i = 0; i < this.state.usersList.length; i++) {
            if (this.state.usersList[i].id > id) {
                id = this.state.usersList[i].id;
            }
        }
        const user = { id: id+1, name: '', email: '', password: '', group: 'user' };
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: true });

    }

    handleEditUser = (event) => {
        console.log('---- handleEditUser', 1)
        const user = this.state.usersList[event.target.id];
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: false });
    }

    saveUsersChanges = (user) => {
        console.log('---- saveUsersChanges', 1)
        const usersList = this.state.usersList;
        if (this.state.addNewUser) {
            usersList.push(user);
        }
        else {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].id === user.id) {
                    usersList[i] = user;
                }
            }
        }

        this.setState({ usersList: usersList });
        localStorage.setItem("usersList", JSON.stringify(usersList));
        this.closeModal();
    }

    closeModal = () => {
        console.log('---- closeModal', 1)
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        
        console.log('---- R users', 1)
        const usersList = this.state.usersList;


        const listItems = usersList.map((usersList) =>
            <tr>
                <td>
                    {usersList.id}
                </td>
                <td>
                    {usersList.name}
                </td>
                <td>
                    {usersList.email}
                </td>
                <td>
                    {usersList.password}
                </td>
                <td>
                    {usersList.group}
                </td>
                <td align="center">
                    <button id={usersList.id.toString()} onClick={this.handleEditUser}>Edit</button>
                </td>
            </tr>
        );

        return (
            <div>

                {this.state.showModal && <MyModal user={{...this.state.user}} saveUsersChanges={(user) => this.saveUsersChanges(user)} closeModal={this.closeModal} />}
                <button onClick={this.handleAddUser}> ADD new user </button>


                <table className="users-table">
                    <caption>Users List</caption>
                    <tr>
                        <th>Id</th><th>Name</th><th>Email</th><th>Password</th><th>Group</th><th>Edit</th>
                    </tr>
                    {listItems}
                </table>
            </div>
        )
    }
}
