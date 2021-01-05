import React, { Component } from 'react'
import './FileComponent.css';
import { setCookie, deleteCookie, getCookie } from '../../../services/CookieService';
import { texts } from '../../../services/LanguageService';

export default class FileHeaderComponent extends Component {
    render() {
        let translation = texts()[getCookie("language")];
        return (
            <div className="details-main-container file-header">
                <div className="details-items-name">{translation.NAME}</div>
                <div className="details-items-date">{translation.DATE}</div>
                <div className="details-items-creater">{translation.CREATER}</div>
                <div className="details-items-size">{translation.SIZE}</div>
            </div>
        )
    }
}
