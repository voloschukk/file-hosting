import './UsersComponent.css';
import React, { Component } from 'react';
import { getUsersData, addUser, editUser, deleteUser } from '../../../services/UsersService';
import ModalComponent from '../../common/Modal/ModalComponent';
import AddUserComponent from '../AddUser/AddUserComponent';
import UserComponent from '../User/UserComponent'
import UserHeaderComponent from '../User/UserHeaderComponent'
import { setCookie, deleteCookie, getCookie } from '../../../services/CookieService';
import { texts } from '../../../services/LanguageService';

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
        // const usersList = this.state.usersList;
        // let promise = promiseUpdateUsersData(usersList);
        // promise.then();
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
        let translation = texts()[getCookie("language")];
        const usersList = this.state.usersList;
        let user = usersList.find(item => item.id.toString() === event.target.id.toString());
        if (user !== undefined) {
            let conf = window.confirm(translation.ARE_YOU_SURE_DELETE_USER + "\"" + user.name + "\"?");
            if (conf) {
                deleteUser(user.id);
                this.setState({ usersList: getUsersData() });
            }
        }
    }

    saveUsersChanges = (user) => {
        if (this.state.addNewUser) {
            addUser(user);
        }
        else {
            editUser(user)
        }
        this.setState({ usersList: getUsersData() });
        this.closeModal();
    }

    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        let translation = texts()[getCookie("language")];
        const usersList = this.state.usersList;
        const listItems = usersList.map((usersList) =>
            <UserComponent usersList={usersList} handleDeleteUser={this.handleDeleteUser} handleEditUser={this.handleEditUser} />
        );

        return (
            <div>
                <ModalComponent isVisible={this.state.showModal}>
                    <AddUserComponent
                        user={{ ...this.state.user }}
                        saveUsersChanges={(user) => this.saveUsersChanges(user)}
                        closeModal={this.closeModal}
                        enableGroup={true}
                        enableAccess={true} />
                </ModalComponent>
                <button className="btn btn-outline-primary btn-sm mb-2" onClick={this.handleAddUser}> {translation.ADD_NEW_USER} </button>
                <UserHeaderComponent />
                {listItems}
            </div>
        )
    }
}
