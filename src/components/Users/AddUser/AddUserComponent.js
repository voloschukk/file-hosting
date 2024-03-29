import './AddUserComponent.css';
import { getUsersData } from '../../../services/UsersService';
import React, { Component } from 'react'
import { setCookie, deleteCookie, getCookie } from '../../../services/CookieService';
import { texts } from '../../../services/LanguageService';

export default class AddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: { password2: props.user.password, ...props.user },
            password2: props.user.password,
            formErrors: { name: '', email: '', password: '', password2: '' },
            isValidForm: false,
            usersList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let isValid = true;
        for (let key in this.state.user) {
            if (this.state.user[key] === '') {
                isValid = false;
            };
        }
        this.setState({ isValidForm: isValid, usersList: getUsersData() });
    }

    handleChange(event) {
        const user = this.state.user;
        user[event.target.name] = event.target.value;
        if (event.target.name === 'access') { user[event.target.name] = event.target.checked }
        this.setState({ user: user },
            () => { this.validateField(event.target.name, event.target.value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let isValid;
        switch (fieldName) {
            case 'name':
                isValid = value.length >= 4;
                fieldValidationErrors.name = isValid ? '' : '! too short';
                if (fieldValidationErrors.name === '') {
                    this.state.usersList.forEach((item) => {
                        if (item.name === value) {
                            fieldValidationErrors.name = "such name already exists";
                        }
                    })
                }
                break;
            case 'email':
                isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isValid ? '' : '! invalid';
                if (fieldValidationErrors.email === '') {
                    this.state.usersList.forEach((item) => {
                        if (item.email === value) {
                            fieldValidationErrors.email = "such email already exists";
                        }
                    })
                }
                break;
            case 'password':
                isValid = value.length >= 8;
                fieldValidationErrors.password = isValid ? '' : '! too short';
                isValid = value === this.state.user.password2;
                fieldValidationErrors.password2 = isValid ? '' : '! not equal';
                break;
            case 'password2':
                isValid = value === this.state.user.password;
                fieldValidationErrors.password2 = isValid ? '' : '! not equal';
                break;
            default:
                break;
        }

        isValid = true;
        for (let key in fieldValidationErrors) {
            if (fieldValidationErrors[key] !== '') {
                isValid = false;
            };
        }
        for (let key in this.state.user) {
            if (this.state.user[key] === '') {
                isValid = false;
            };
        }
        this.setState({ formErrors: fieldValidationErrors, isValidForm: isValid });
    }

    handleSubmit(event) {
        let { user, usersList } = this.state;
        delete user.password2;
        if (user.id === null) {
            let id = usersList.reduce((result, current) => (result > current.id) ? result : current.id, 0) + 1;
            user.id = id;
        }
        this.props.saveUsersChanges(user)
        event.preventDefault();
    }

    render() {
        let translation = texts()[getCookie("language")];
        return (
            <>
                <img className="cancel-button pointer" alt="cancel" src="https://img.icons8.com/ultraviolet/25/000000/cancel.png" onClick={this.props.closeModal} />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="inputName" >{translation.NAME}</label>
                        <input type="text" className="form-control form-control-sm" name="name" value={this.state.user.name} onChange={this.handleChange} id="inputName" aria-describedby="nameHelp" />
                        <small id="nameHelp" className="form-text text-muted error">{this.state.formErrors.name}</small>
                    </div>
                    <div className="form-group">
                        <label for="inputEmail">{translation.EMAIL}</label>
                        <input type="email" className="form-control form-control-sm" name="email" value={this.state.user.email} onChange={this.handleChange} id="inputEmail" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted error">{this.state.formErrors.email}</small>
                    </div>

                    <div className="form-group">
                        <label for="inputPassword">{translation.PASSWORD}</label>
                        <input type="text" className="form-control form-control-sm" name="password" value={this.state.user.password} onChange={this.handleChange} id="inputPassword" aria-describedby="passwordHelp" />
                        <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password}</small>
                    </div>
                    <div className="form-group">
                        <label for="inputPassword2">{translation.PASSWORD}</label>
                        <input type="text" className="form-control form-control-sm" name="password2" value={this.state.user.password2} onChange={this.handleChange} id="inputPassword2" aria-describedby="passwordHelp" />
                        <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password2}</small>
                    </div>


                    {this.props.enableGroup &&
                        <div className="form-group">
                            <label for="inputGroup">{translation.GROUP}</label>
                            <select className="custom-select form-control-sm" value={this.state.user.group} name="group" onChange={this.handleChange} id="inputGroup" >
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="user">User</option>
                            </select>
                            <div className="error"></div>
                        </div>}

                    {this.props.enableAccess &&

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked={this.state.user.access} name="access" onChange={this.handleChange} id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">{translation.ACCESS}</label>
                        </div>}

                    <div className="button-group">
                        <input disabled={!this.state.isValidForm} className="btn btn-primary m-1" type="submit" value={translation.SUBMIT} />
                        <button className="btn btn-primary m-1" onClick={this.props.closeModal}>{translation.CANCEL}</button>
                    </div>
                </form>
            </>
        )
    }
}
