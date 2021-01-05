import './UserComponent.css';
import React, { Component } from 'react'
import { setCookie, deleteCookie, getCookie } from '../../../services/CookieService';
import { texts } from '../../../services/LanguageService';

export default class UserHeaderComponent extends Component {
    render() {
        let translation = texts()[getCookie("language")];
        return (
            <div className="user-main-container file-header">
                <div className="user-items-id">{translation.ID}</div>
                <div className="user-items-access">{translation.AC}</div>
                <div className="user-items-name">{translation.NAME}</div>
                <div className="user-items-email">{translation.EMAIL}</div>
                <div className="user-items-password">{translation.PASSWORD}</div>
                <div className="user-items-group">{translation.GROUP}</div>
                <div className="user-items-edit">{translation.EDIT}</div>
                <div className="user-items-delete">{translation.DEL}</div>
            </div>
        )
    }
}