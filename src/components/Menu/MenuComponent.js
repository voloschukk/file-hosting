import './MenuComponent.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setCookie, deleteCookie, getCookie } from '../../services/CookieService';
import { texts } from '../../services/LanguageService';

export default class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [{ name: 'HOME', path: '/', className: 'list-group-item' },
            { name: 'USERS', path: '/users', className: 'list-group-item' },
            { name: 'MY_DATA', path: '/my-data', className: 'list-group-item' },
            { name: 'TRASH', path: '/trash', className: 'list-group-item' },
            { name: 'SETTIND', path: '/setting', className: 'list-group-item' }],
        };
        this.changeActive = this.changeActive.bind(this);
    }

    componentDidMount() {
        const listLinks = this.state.links;
        listLinks.forEach(item => {
            item.className = "list-group-item";
            if (item.path === window.location.pathname) { item.className = "list-group-item active" }
        });
        this.setState({ links: listLinks });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userRole !== this.props.userRole) {
            const listLinks = this.state.links;
            listLinks.forEach(item => {
                item.className = "list-group-item";
                if (item.path === window.location.pathname) { item.className = "list-group-item active" }
            });
            this.setState({ links: listLinks });
        }
    }

    changeActive(event) {
        let translation = texts()[getCookie("language")];
        if (event.target.parentNode.nodeName === "LI") {
            const listLinks = this.state.links;
            listLinks.forEach(item => {
                item.className = translation[item.name] === event.target.textContent ? "list-group-item active" : "list-group-item";
            });
            this.setState({ links: listLinks });
        }
    }

    render() {
        
        let translation = texts()[getCookie("language")];

        const links = this.state.links.slice(0);
        
        if (this.props.userRole !== 'admin') {
            let indexUsers = links.findIndex(item => item.name === 'USERS');
            if ( indexUsers !== -1) links.splice(indexUsers, 1);
        }

        const listLinks = links.map((links) =>
            <li className={links.className} onClick={this.changeActive}><Link to={links.path}>{translation[links.name]}</Link></li>
        );

        return (
            <div>
                <nav>
                    <ul className="nav flex-column list-group-flush">
                        {this.props.isLogIn && listLinks}
                        {!this.props.isLogIn && <li className="list-group-item active" onClick={this.changeActive}><Link to='/'>{translation.LOGIN}</Link></li>}
                    </ul>
                </nav>
            </div>
        )
    }
}