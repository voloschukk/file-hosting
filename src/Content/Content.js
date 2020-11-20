import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Users from '../Users/Users';


export default class Content extends Component {
    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/users' component={Users} />
                        <Route path='/menu2' component={null} />
                        <Route path='/menu3' component={null} />
                        <Route path='/menu4' component={null} />
                    </Switch>
                </main>
            </div>
        )
    }
}
