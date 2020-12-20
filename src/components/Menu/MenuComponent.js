import './MenuComponent.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [{ name: 'Home', path: '/', className: 'list-group-item' },
            { name: 'Users', path: '/users', className: 'list-group-item' },
            { name: 'My Data', path: '/my-data', className: 'list-group-item' },
            { name: 'Trash', path: '/trash', className: 'list-group-item' },
            { name: 'Setting', path: '/setting', className: 'list-group-item' }],
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
        if (event.target.parentNode.nodeName === "LI") {
            const listLinks = this.state.links;
            listLinks.forEach(item => {
                item.className = item.name === event.target.textContent ? "list-group-item active" : "list-group-item";
            });
            this.setState({ links: listLinks });
        }
    }

    render() {
        const links = this.state.links.slice(0);
        
        if (this.props.userRole !== 'admin') {
            let indexUsers = links.findIndex(item => item.name === 'Users');
            if ( indexUsers !== -1) links.splice(indexUsers, 1);
        }

        const listLinks = links.map((links) =>
            <li className={links.className} onClick={this.changeActive}><Link to={links.path}>{links.name}</Link></li>
        );

        return (
            <div>
                <nav>
                    <ul className="nav flex-column list-group-flush">
                        {this.props.isLogIn && listLinks}
                        {!this.props.isLogIn && <li className="list-group-item active" onClick={this.changeActive}><Link to='/'>LogIn</Link></li>}
                    </ul>
                </nav>
            </div>
        )
    }
}