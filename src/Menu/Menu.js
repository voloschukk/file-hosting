import './Menu.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [{ name: 'Home', path: '/', className: 'list-group-item'},
            { name: 'Users', path: '/users', className: 'list-group-item'},
            { name: 'Menu2', path: '/menu2', className: 'list-group-item'},
            { name: 'Menu3', path: '/menu3', className: 'list-group-item'},
            { name: 'Menu4', path: '/menu4', className: 'list-group-item'}],
        };
        this.changeActive = this.changeActive.bind(this);

    }

    componentDidMount(){
        const listLinks = this.state.links;
        listLinks.forEach(function (item, i, arr) {
            item.className = "list-group-item";
            if (item.path === window.location.pathname) {item.className = "list-group-item active"}
        });
        this.setState({ links: listLinks });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userRole !== this.props.userRole) {
            const listLinks = this.state.links;
            listLinks.forEach(function (item, i, arr) {
                item.className = "list-group-item";
                if (item.path === window.location.pathname) {item.className = "list-group-item active"}
            });
            this.setState({ links: listLinks });
        }



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
        console.log('----- Menu')

        const links = this.state.links;

        if (this.props.userRole !== 'admin') {
            for (let i = 0; i < links.length; i++) {
                if (links[i].name === 'Users') {
                    //links.splice(i, 1);
                    links[i].className = links[i].className + " hide";
                    break;
                }
            }
        }

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