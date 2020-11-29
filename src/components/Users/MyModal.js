import './MyModal.css';
import React, { Component } from 'react'

<script src="http://localhost:8097"></script>

export default class MyModal extends Component {

    constructor(props) {
        super(props);
        this.state = { user: { password2: props.user.password, ...props.user }, password2: props.user.password, formErrors: { name: '', email: '', password: '', password2: '' }, isValidForm: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let isValid = true;
        for (let key in this.state.user) {
            if (this.state.user[key] === '') {
                isValid = false;
            };
        }
        this.setState({isValidForm: isValid });
    }

    handleChange(event) {
        console.log('---- handleChange', 2)
        const user = this.state.user;
        user[event.target.name] = event.target.value;
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
                break;
            case 'email':
                isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isValid ? '' : '! invalid';
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
        const user = this.state.user;
        delete user.password2;
        this.props.saveUsersChanges(user)
    }

    render() {
        return (
            <div className="modal">
                <div className="container modal-content" >
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputName" >Name</label>
                            <input type="text" className="form-control form-control-sm" name="name" value={this.state.user.name} onChange={this.handleChange} id="inputName" aria-describedby="nameHelp" />
                            <small id="nameHelp" className="form-text text-muted error">{this.state.formErrors.name}</small>
                        </div>
                        <div className="form-group">
                            <label for="inputEmail">Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" value={this.state.user.email} onChange={this.handleChange} id="inputEmail" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted error">{this.state.formErrors.email}</small>
                        </div>
                        <div className="form-group">
                            <label for="inputGroup">Group</label>
                            <select className="custom-select form-control-sm" value={this.state.user.group} name="group" onChange={this.handleChange} id="inputGroup" >
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="user">User</option>
                            </select>
                            <div className="error"></div>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="text" className="form-control form-control-sm" name="password" value={this.state.user.password} onChange={this.handleChange} id="inputPassword" aria-describedby="passwordHelp" />
                            <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password}</small>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword2">Password Confirm</label>
                            <input type="text" className="form-control form-control-sm" name="password2" value={this.state.user.password2} onChange={this.handleChange} id="inputPassword2" aria-describedby="passwordHelp" />
                            <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password2}</small>
                        </div>
                        <input disabled={!this.state.isValidForm} className="btn btn-primary m-1" type="submit" value="Submit" />
                        <button className="btn btn-primary m-1" onClick={this.props.closeModal}>Cancel</button>
                    </form>
                </div>
            </div >
        )
    }
}
