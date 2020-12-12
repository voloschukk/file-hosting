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
            <div className="height100">
                {this.props.isLogIn &&
                    <Switch>
                        <Route exact path='/' component={Home} />
                        {isAdmin && <Route path='/users' component={Users} />}
                        <Route path='/userdata' render={(props) => {
                            console.log('222')
                            return <Userdata {...props} user={user} trash={false} />} 
                        }/>
                        <Route path='/trash' render={(props) =>{
                            console.log('11111')
                            return <Userdata {...props} user={user} trash={true} />}
                         } />
                        <Route path='/menu4' component={null} />
                    </Switch>
                }
                {!this.props.isLogIn &&
                    <Switch>
                        <Route path='/' render={(props) => <Login {...props} tryLogin={(userEmail, userPassword) => this.props.tryLogin(userEmail, userPassword)} />} />
                    </Switch>
                }


            </div>
        )
    }

}
