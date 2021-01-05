import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../Home/HomeComponent';
import LoginComponent from '../Login/LoginComponent';
import UsersComponent from '../Users/Users/UsersComponent';
import FilesComponent from '../Files/Files/FilesComponent';
import SettingComponent from '../Setting/SettingComponent';

export default class ContentComponent extends Component {

    render() {
        let isAdmin = false;
        this.props.user.group === 'admin' ? isAdmin = true : isAdmin = false;
        const user = this.props.user;

        return (
            <div className="height100">
                {this.props.isLogIn &&
                    <Switch>
                        <Route exact path='/' component={HomeComponent} />
                        {isAdmin && <Route path='/users' component={UsersComponent} />}
                        <Route path='/my-data' render={(props) => {
                            return <FilesComponent {...props} user={user} isTrash={false} enableAddFile={true} enableRenameFile={true} enablePath={true}/>
                        }
                        } />
                        <Route path='/trash' render={(props) => {
                            return <FilesComponent {...props} user={user} isTrash={true} enableAddFile={false} enableRenameFile={false} enablePath={false} />
                        }
                        } />
                        <Route path='/setting' render={(props) => {
                            return <SettingComponent {...props} user={user} logOut={this.props.logOut} />
                        }
                        }/>
                    </Switch>
                }
                {!this.props.isLogIn &&
                    <Switch>
                        <Route path='/' render={(props) => <LoginComponent {...props} logInMassage = {this.props.logInMassage} tryLogin={(userEmail, userPassword) => this.props.tryLogin(userEmail, userPassword)} />} />
                    </Switch>
                }
            </div>
        )
    }
}
