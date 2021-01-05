import React, { Component } from 'react'
import { deleteUser } from '../../services/UsersService'
import { setCookie, deleteCookie, getCookie } from '../../services/CookieService';
import { texts } from '../../services/LanguageService';

export default class SettingComponent extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        let translation = texts()[getCookie("language")];
        let conf = window.confirm(translation.DELETE_MY_PROFILE);
        if (conf) {
            this.props.logOut();
            deleteUser(this.props.user.id);
        }
    }

    render() {
        let translation = texts()[getCookie("language")];
        return (
            <div>
                <button type="button" class="btn btn-outline-primary" onClick={this.deleteUser}>{translation.DELETE_MY_PROFILE}</button>
            </div>
        )
    }
}
