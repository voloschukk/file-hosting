import './UsersComponent.css';
import React, { Component } from 'react';
import { getUsersData, promiseUpdateUsersData } from '../../../services/UsersService';
import ModalAddUserComponent from '../ModalAddUser/ModalAddUserComponent';
import UserComponent from '../User/UserComponent'
import UserHeaderComponent from '../User/UserHeaderComponent'

export default class UsersComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { usersList: getUsersData() };
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    state = {
        user: { id: null, name: '', email: '', password: '', group: 'user', access: false },
        showModal: false,
        addNewUser: false
    }

    componentDidUpdate() {
        const usersList = this.state.usersList;
        let promise = promiseUpdateUsersData(usersList);
        promise.then();
    }

    handleAddUser = () => {
        let randomUser = Math.ceil(Math.random() * 1000);
        const user = { id: null, name: 'user' + randomUser, email: 'example' + randomUser + '@gmail.com', password: 'password' + randomUser, group: 'user', access: false };
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: true });
    }

    handleEditUser = (event) => {
        const user = this.state.usersList[event.target.id];
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: false });
    }

    handleDeleteUser = (event) => {
        let conf = window.confirm("Are you sure you want to delete the user?");
        if (conf) {
            const usersList = this.state.usersList;
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].id.toString() === event.target.id.toString()) {
                    usersList.splice(i, 1);
                    this.setState({ usersList: usersList });
                    break;
                }
            }
        }
    }

    saveUsersChanges = (user) => {
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
        this.closeModal();
    }

    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const usersList = this.state.usersList;
        const listItems = usersList.map((usersList) =>
            <UserComponent usersList={usersList} handleDeleteUser={this.handleDeleteUser} handleEditUser={this.handleEditUser} />
        );

        return (
            <div>
                {this.state.showModal && <ModalAddUserComponent
                    showModal={this.state.showModal}
                    user={{ ...this.state.user }}
                    saveUsersChanges={(user) => this.saveUsersChanges(user)}
                    closeModal={this.closeModal}
                    enableGroup={true}
                    enableAccess={true} />}
                <button className="btn btn-outline-primary btn-sm mb-2" onClick={this.handleAddUser}> ADD new user </button>
                <UserHeaderComponent />
                {listItems}
            </div>
        )
    }
}
