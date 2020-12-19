import './LoginComponent.css';
import React, { Component } from 'react'
import { getUsersData, promiseUpdateUsersData } from '../../services/UsersService';
import ModalAddUserComponent from '../Users/ModalAddUser/ModalAddUserComponent'

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { userEmail: '', userPassword: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registration = this.registration.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    state = {
        isWrongUserData: false,
        isRegistartion: false,
    }

    handleChange(event) {
        if (event.target.name === 'userEmail') {
            this.setState({ userEmail: event.target.value });
        }
        if (event.target.name === 'userPassword') {
            this.setState({ userPassword: event.target.value });
        }
    }

    handleSubmit() {
        this.setState({ isWrongUserData: true });
        this.props.tryLogin(this.state.userEmail, this.state.userPassword);
    }

    registration() {

        this.setState({ isRegistartion: !this.state.isRegistartion, isWrongUserData: false });
    }

    closeModal = () => {
        this.setState({ isRegistartion: !this.state.isRegistartion })
    }

    addUser(user) {
        let usersList = getUsersData();
        usersList.push(user);
        let promise = promiseUpdateUsersData(usersList);
        promise.then();
        this.closeModal();
    }


    render() {

        let user = { id: null, name: '', email: '', password: '', group: 'user', access: false };

        return (
            <div>
                {this.state.isRegistartion && <ModalAddUserComponent
                    showModal={this.state.isRegistartion}
                    user={user}
                    saveUsersChanges={(user) => this.addUser(user)}
                    closeModal={this.closeModal}
                    enableGroup={false}
                    enableAccess={false} />}
                <form>
                    <div className="form-group">
                        <label for="inputEmail">Email address {this.state.isWrongUserData && <span className="red">- {this.props.logInMassage}</span>}</label>
                        <input type="text" name='userEmail' value={this.state.userEmail} onChange={this.handleChange} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="text" name='userPassword' value={this.state.userPassword} onChange={this.handleChange} className="form-control" id="inputPassword" />
                    </div>

                </form>
                <button type="submit" class="btn btn-primary mt-2" onClick={this.handleSubmit}>Submit</button>
                <button type="submit" class="btn btn-link mt-2" onClick={this.registration}>Registration</button>
            </div>
        )
    }
}
