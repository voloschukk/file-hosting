import './App.css';
import React, { Component } from 'react';
import MenuComponent from '../Menu/MenuComponent';
import ContentComponent from '../Content/ContentComponent';
import { initFilesData } from '../../services/FilesService';
import { initUsersData } from '../../services/UsersService';
import { set_cookie, delete_cookie, get_cookie } from '../../services/CookieService';

initFilesData();
initUsersData();

//promiseStartData.then();

export default class App extends Component {

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

  componentDidMount() {
    let userEmail = get_cookie("userEmail");
    let userPassword = get_cookie("userPassword");
    if (userEmail !== null && userPassword !== null) {
      this.tryLogin(userEmail, userPassword);
    }
  }

  tryLogin = (userEmail, userPassword) => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].email === userEmail && usersList[i].password === userPassword) {
        this.setState({ isLogIn: true, user: usersList[i], userRole: usersList[i].group });
        set_cookie("userEmail", userEmail);
        set_cookie("userPassword", userPassword);
        break;
      }
    }
  }

  handleLogOut() {
    this.setState({ isLogIn: false, userRole: 'user' });
    delete_cookie("userEmail");
    delete_cookie("userPassword");
  }

  render() {

    name ();

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
            <MenuComponent userRole={this.state.userRole} isLogIn={this.state.isLogIn} />
          </div>
          <div className="col col-9">
            <ContentComponent user={this.state.user} isLogIn={this.state.isLogIn} tryLogin={(userEmail, userPassword) => this.tryLogin(userEmail, userPassword)} />
          </div>
        </div>
      </div>
    );
  }
}

function name(params) {

  let repete = 10;

  let arr = []
  for (let i = 0; i < 1000000; i++) {
    arr.push(i);
  }

  let time, a;
  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    for (let i = 0; i < arr.length; i++) {
      a = "item " + i;
    }
    const end = new Date().getTime();
    time =+ (end - start);
  }
  console.log('time_for', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    arr.forEach(function (item) {
      a = "item " + item;
    });
    const end = new Date().getTime();
    time =+ (end - start);
  }
  console.log('time_foreach', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    a = arr.map(function (item) {
      return "item " + item;
    });
    const end = new Date().getTime();
    time =+ (end - start);
  }
  console.log('time_map', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    a = arr.reduce(function (sum, current) {
      return "item " + current;
    });
    const end = new Date().getTime();
    time =+ (end - start);
  }
  console.log('time_ruduse', time / repete);
}
