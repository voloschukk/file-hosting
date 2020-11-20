import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li><Link to='/menu2'>Menu2</Link></li>
                        <li><Link to='/menu3'>Menu3</Link></li>
                        <li><Link to='/menu4'>Menu4</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Menu