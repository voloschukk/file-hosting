import './Menu.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [{ name: 'Home', path: '/', className: 'list-group-item' },
            { name: 'Users', path: '/users', className: 'list-group-item' },
            { name: 'Menu2', path: '/menu2', className: 'list-group-item' },
            { name: 'Menu3', path: '/menu3', className: 'list-group-item' },
            { name: 'Menu4', path: '/menu4', className: 'list-group-item' }]
        };
        this.changeActive = this.changeActive.bind(this);
    }

    changeActive(event) {
        if (event.target.parentNode.nodeName === "LI") {
            const listLinks = this.state.links;
            listLinks.forEach(function (item, i, arr) {
                item.name === event.target.textContent ? item.className = "list-group-item active" : item.className = "list-group-item";
            });
            this.setState({ links: listLinks });
        }
    }

    render() {
        const links = this.state.links;
        const listLinks = links.map((links) =>
            <li className={links.className} onClick={this.changeActive}><Link to={links.path}>{links.name}</Link></li>
        );

        return (
            <div>
                <nav>
                    <ul className="nav flex-column list-group-flush">
                        {listLinks}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Menu