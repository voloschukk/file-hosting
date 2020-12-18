import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Users from '../Users/Users';
import Login from '../Login/Login';
import Files from '../Files/Files';

export default class Content extends Component {

    render() {
        let isAdmin = false;
        this.props.user.group === 'admin' ? isAdmin = true : isAdmin = false;
        const user = this.props.user;


        return (
            <div className="height100">
                {this.props.isLogIn &&
                    <Switch>
                        <Route exact path='/' component={Home} />
                        {isAdmin && <Route path='/users' component={Users} />}
                        <Route path='/my-data' render={(props) => {
                            return <Files {...props} user={user} isTrash={false} enableAddFile={true} enableRenameFile={true}/>
                        }
                        } />
                        <Route path='/trash' render={(props) => {
                            return <Files {...props} user={user} isTrash={true} enableAddFile={false} enableRenameFile={false}/>
                        }
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
