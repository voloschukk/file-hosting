import React, { Component } from 'react'

<script src="http://localhost:8097"></script>

export default class MyModal extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user, password2: props.user.password, formErrors: { name: '', email: '', password: '', password2: '' }, isValid: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        let isValidForm;
        switch (fieldName) {
            case 'name':
                isValidForm = value.length >= 4;
                fieldValidationErrors.name = isValidForm ? '' : ' is too short';
                break;
            case 'email':
                isValidForm = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isValidForm ? '' : ' is invalid';
                break;
            case 'password':
                isValidForm = value.length >= 8;
                fieldValidationErrors.password = isValidForm ? '' : ' is too short';
                isValidForm = value === this.state.password2;
                fieldValidationErrors.password2 = isValidForm ? '' : '  not equal';
                break;
            default:
                break;
        }
        this.setState({ isValid: isValidForm, formErrors: fieldValidationErrors });
    }

    handleChangePassword2(event) {
        let fieldValidationErrors = this.state.formErrors;
        this.setState({ password2: event.target.value });
        fieldValidationErrors.password2 = this.state.user.password === event.target.value ? '' : ' not equal';
        fieldValidationErrors.password2 = this.state.user.password === event.target.value ? "" : this.setState({ isValid: false });
        this.setState({ formErrors: fieldValidationErrors });
    }


    handleSubmit(event) {
        console.log('---- handleSubmit', 2)
        let isValidForm = true;
        let fieldValidationErrors = this.state.formErrors;
        for (let key in fieldValidationErrors) {
            if (fieldValidationErrors[key] !== '') {
                isValidForm = false;
            };
        }

        event.preventDefault();

        isValidForm ? this.props.saveUsersChanges(this.state.user) : alert('Please correctly fill out the fields');
    }

    render() {
        console.log('---- R modal', 2)
        return (
            <div className="modal">
                <div className="container modal-content" >
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputName" >Name</label>
                            <input type="text" className="form-control form-control-sm" name="name" value={this.state.user.name} onChange={this.handleChange} required id="inputName" aria-describedby="nameHelp" />
                            <small id="nameHelp" className="form-text text-muted error">{this.state.formErrors.name}</small>
                        </div>
                        <div className="form-group">
                            <label for="inputEmail">Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" value={this.state.user.email} onChange={this.handleChange} required id="inputEmail" aria-describedby="emailHelp" />
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
                            <input type="password" className="form-control form-control-sm" name="password" value={this.state.user.password} onChange={this.handleChange} required id="inputPassword" aria-describedby="passwordHelp" />
                            <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password}</small>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword2">Password Confirm</label>
                            <input type="password" className="form-control form-control-sm" name="password2" value={this.state.user.password2} onChange={this.handleChangePassword2} required id="inputPassword2" aria-describedby="passwordHelp" />
                            <small id="passwordHelp" className="form-text text-muted error">{this.state.formErrors.password2}</small>
                        </div>


                        <input disabled={!this.state.isValid} className="btn btn-primary m-1" type="submit" value="Submit" />
                        <button className="btn btn-primary m-1" onClick={this.props.closeModal}>Cancel</button>
                    </form>
                </div>
            </div >
        )
    }
}
