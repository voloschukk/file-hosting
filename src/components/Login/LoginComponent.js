import './LoginComponent.css';
import React, { Component } from 'react'

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { userEmail: '', userPassword: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        isWrongUserData: false
    }

    handleChange(event) {
        if (event.target.name === 'userEmail') {
            this.setState({ userEmail: event.target.value });
        }
        if (event.target.name === 'userPassword') {
            this.setState({ userPassword: event.target.value });
        }
    }

    handleSubmit(event) {
        this.setState({isWrongUserData: true});
        this.props.tryLogin(this.state.userEmail, this.state.userPassword);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="inputEmail">Email address {this.state.isWrongUserData && <span className="red">- Incorrect login or password</span>}</label>
                        <input type="text" name='userEmail' value={this.state.userEmail} onChange={this.handleChange} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="text" name='userPassword' value={this.state.userPassword} onChange={this.handleChange} className="form-control" id="inputPassword" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="Check" />
                        <label class="form-check-label" for="Check">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
