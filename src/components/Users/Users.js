import './Users.css';
import React, { Component } from 'react';
import MyModal from './MyModal';
import { getDataFromServer, promiseGetDataFromServer, promiseUpdateDataOnServer } from '../../services/workWithDatabase';
import User from './User'

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { usersList: getDataFromServer() };
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    state = {
        user: { id: null, name: '', email: '', password: '', group: 'user' },
        showModal: false,
        addNewUser: false
    }

    componentDidUpdate() {
        const usersList = this.state.usersList;
        let promise = promiseUpdateDataOnServer(usersList);
        promise.then();
    }

    handleAddUser = () => {
        console.log('---- handleAddUser', 1)
        let id = 0;
        for (let i = 0; i < this.state.usersList.length; i++) {
            if (this.state.usersList[i].id > id) {
                id = this.state.usersList[i].id;
            }
        }
        id = id + 1;
        const user = { id: id, name: 'user' + id, email: 'example@gmail.com', password: 'password' + id, group: 'user' };
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: true });
    }

    handleEditUser = (event) => {
        console.log('---- handleEditUser', 1)
        const user = this.state.usersList[event.target.id];
        this.setState({ user: user, showModal: !this.state.showModal, addNewUser: false });
    }

    handleDeleteUser = (event) => {
        let conf = window.confirm("Are you sure you want to delete the user?");
        if (conf) {
            console.log('---- handleDeleteUser', 1)
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
        this.closeModal();
    }

    closeModal = () => {
        console.log('---- closeModal', 1)
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        console.log('----- Users')
        const usersList = this.state.usersList;
        const listItems = usersList.map((usersList) =>
            <User usersList={usersList} handleDeleteUser={this.handleDeleteUser} handleEditUser={this.handleEditUser} />
        );

        return (
            <div>
                {this.state.showModal && <MyModal
                    showModal={this.state.showModal}
                    user={{ ...this.state.user }}
                    saveUsersChanges={(user) => this.saveUsersChanges(user)}
                    closeModal={this.closeModal} />}
                <button className="btn btn-outline-primary btn-sm mb-2" onClick={this.handleAddUser}> ADD new user </button>
                {/* <table className="table table-bordered table-sm table-hover">
                    <caption>Users List</caption>
                    <thead className="thead-light"></thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Group</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    <tbody>{listItems}</tbody>
                </table> */}

                <div class="d-flex flex-row bd-highlight border">
                    <div class="p-2 w-10 bd-highlight">Id</div>
                    <div class="p-2 flex-fill bd-highlight">Name</div>
                    <div class="p-2 flex-fill bd-highlight">Email</div>
                    <div class="p-2 flex-fill bd-highlight">Password</div>
                    <div class="p-2 flex-fill bd-highlight">Group</div>
                    <div class="p-2 w-20 bd-highlight justify-content-center">Edit</div>
                    <div class="p-2 w-20 bd-highlight">Delete</div>
                </div>
                {listItems}


            </div>
        )
    }
}
