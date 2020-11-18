import React, { Component } from 'react'

<script src="http://localhost:8097"></script>

export default class MyModal extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user, password2: props.user.password, formErrors: { name: '', email: '', password: '', password2: '' } };
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
        let isValid;
        switch (fieldName) {
            case 'name':
                isValid = value.length >= 4;
                fieldValidationErrors.name = isValid ? '' : ' is too short';
                break;
            case 'email':
                isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isValid ? '' : ' is invalid';
                break;
            case 'password':
                isValid = value.length >= 8;
                fieldValidationErrors.password = isValid ? '' : ' is too short';
                isValid = value === this.state.password2 ;
                fieldValidationErrors.password2 = isValid ? '' : '  not equal';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors});
    }

    handleChangePassword2(event) {
        let fieldValidationErrors = this.state.formErrors;
        this.setState({ password2: event.target.value });
        fieldValidationErrors.password2 = this.state.user.password === event.target.value ? '' : ' not equal';
        this.setState({formErrors: fieldValidationErrors});
    }


    handleSubmit(event) {
        console.log('---- handleSubmit', 2)
        let isValidForm = true;
        let fieldValidationErrors = this.state.formErrors;
        for (let key in fieldValidationErrors) {
            if(fieldValidationErrors[key] !== ''){
                isValidForm = false;
            };
        }
        let user = this.state.user;
        for (let key in user) {
            if(user[key] === ''){
                isValidForm = false;
            };
        }
        if(this.state.password2 === ''){
            isValidForm = false;
        }

        event.preventDefault();
        
        isValidForm ? this.props.saveUsersChanges(this.state.user) : alert('Please correctly fill out the fields') ;
    }

    render() {
        console.log('---- R modal', 2)
        return (
            <div class="modal">
                <div class="modal-content" >
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label> Name <br />
                                <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange} />
                                <div class="error">{this.state.formErrors.name}</div>
                            </label>
                        </div>
                        <div>
                            <label> Email <br />
                                <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange} />
                                <div class="error">{this.state.formErrors.email}</div>
                            </label>
                        </div>
                        <div>
                            Group<br />
                            <select value={this.state.user.group} name="group" onChange={this.handleChange}>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div>
                            <label> Password <br />
                                <input type="text" name="password" value={this.state.user.password} onChange={this.handleChange} />
                                <div class="error">{this.state.formErrors.password}</div>
                            </label>
                        </div>
                        <div>
                            <label> Password Confirm <br />
                                <input type="text" name="password2" value={this.state.password2} onChange={this.handleChangePassword2} />
                                <div class="error">{this.state.formErrors.password2}</div>
                            </label>
                        </div>


                        <input type="submit" value="Отправить" />
                        <button onClick={this.props.closeModal}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}
