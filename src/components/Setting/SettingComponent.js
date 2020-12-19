import React, { Component } from 'react'
import { deleteUser } from '../../services/UsersService'

export default class SettingComponent extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        let conf = window.confirm("Are you sure you want to delete your profile?");
        if (conf) {
            this.props.logOut();
            deleteUser(this.props.user.id);
        }
    }

    render() {
        return (
            <div>
                <button type="button" class="btn btn-outline-primary" onClick={this.deleteUser}>Delete my profile from site</button>
            </div>
        )
    }
}
