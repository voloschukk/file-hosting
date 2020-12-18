import './App.css';
import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Content from '../Content/Content';
import { startData , promiseStartData } from '../../services/StartDataService';

 startData();

//promiseStartData.then();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      user: { id: null, name: '', email: '', password: '', group: 'user' },
      userRole: 'user'
    }
    this.tryLogin = this.tryLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  

  tryLogin = (userEmail, userPassword) => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].email === userEmail && usersList[i].password === userPassword) {
        this.setState({ isLogIn: true, user: usersList[i], userRole: usersList[i].group });
        break;
      }
    }
  }

  handleLogOut() {
    this.setState({ isLogIn: false, userRole: 'user' });
  }


  render() {
    console.log('----- App')
    return (
      <div className="container-xl">
        <header className="row border p-2 border-primary ">
          LOGO
        </header>
        <div className="row border border-primary user-row">
          {!this.state.isLogIn && <label className="m-2">Hello, guest</label>}
          {this.state.isLogIn && <label className="m-2">Hello, {this.state.user.name}</label>}
          {this.state.isLogIn && <button className="btn btn-outline-primary btn-sm ml-1" onClick={this.handleLogOut}> LogOut </button>}
        </div>
        <div className="row p-2 border border-primary main-row">
          <div className="col col-3 p-2 border border-primary">
            <Menu userRole={this.state.userRole} isLogIn={this.state.isLogIn} />
          </div>
          <div className="col col-9">
            <Content user={this.state.user} isLogIn={this.state.isLogIn} tryLogin={(userEmail, userPassword) => this.tryLogin(userEmail, userPassword)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App
