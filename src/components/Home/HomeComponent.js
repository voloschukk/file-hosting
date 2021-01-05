import React, { Component } from 'react';
import { setCookie, deleteCookie, getCookie } from '../../services/CookieService';
import { texts } from '../../services/LanguageService';

export default class HomeComponent extends Component {
    render() {
        let translation = texts()[getCookie("language")];
        return (
            <div>
                {translation.HOME}
            </div>
        )
    }
}