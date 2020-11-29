import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Users from '../Users/Users';
import Login from '../Login/Login';
import Userdata from '../Userdata/Userdata';

export default class Content extends Component {

    render() {
        console.log('----- Content')
        let isAdmin = false;
        this.props.user.group === 'admin' ? isAdmin = true : isAdmin = false;
        const user = this.props.user;
        

        return (
            <div>
                {this.props.isLogIn &&
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            {isAdmin && <Route path='/users' component={Users} />}
                            <Route path='/userdata' render={(props) => <Userdata {...props} user={user} />} />
                            <Route path='/menu3' component={null} />
                            <Route path='/menu4' component={null} />
                        </Switch>
                    </main>}
                {!this.props.isLogIn &&
                    <main>
                        <Switch>
                            <Route path='/' render={(props) => <Login {...props} tryLogin={(userEmail, userPassword) => this.props.tryLogin(userEmail, userPassword)}/>} />
                        </Switch>
                    </main>}


            </div>
        )
    }

}
