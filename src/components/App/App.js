import './App.css';
import React, { Component } from 'react';
import MenuComponent from '../Menu/MenuComponent';
import ContentComponent from '../Content/ContentComponent';
import { initFilesData } from '../../services/FilesService';
import { initUsersData } from '../../services/UsersService';
import { setCookie, deleteCookie, getCookie } from '../../services/CookieService';
import { texts } from '../../services/LanguageService';

initFilesData();
initUsersData();

//promiseStartData.then();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      user: { id: null, name: '', email: '', password: '', group: 'user', access: false },
      userRole: 'user',
      logInMassage: '',
      language: "en"
    }
    this.tryLogin = this.tryLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentDidMount() {
    let userEmail = getCookie("userEmail");
    let userPassword = getCookie("userPassword");
    if (userEmail !== null && userPassword !== null) {
      this.tryLogin(userEmail, userPassword);
    }
    let language = getCookie("language");
    if (language !== null ) {
      this.setState({ language: language});
    }

  }

  tryLogin = (userEmail, userPassword) => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    let user = usersList.find(item => item.email === userEmail && item.password === userPassword);
    if (user) {
      if (user.access) {
        this.setState({ isLogIn: true, user: user, userRole: user.group });
        setCookie("userEmail", userEmail);
        setCookie("userPassword", userPassword);
      }
      else {
        this.setState({ logInMassage: 'wait for administrator confirmation' });
      }
    }
    else {
      this.setState({ logInMassage: 'incorrect login or password' });
    }
  }

  handleLogOut() {
    this.setState({ isLogIn: false, userRole: 'user' });
    deleteCookie("userEmail");
    deleteCookie("userPassword");
  }

  changeLanguage() {
    let newLanguage = this.state.language === "ru" ? "en" : "ru";
    this.setState({ language: newLanguage });
    setCookie("language", newLanguage);
  }


  render() {

    //test ();

    let translation = texts()[this.state.language];

    return (
      <div className="container-xl">
        <header className="row border p-2 border-primary ">
          File hosting
          <button className="btn btn-outline-primary" onClick={this.changeLanguage}> {this.state.language} </button>
        </header>
        <div className="row border border-primary user-row">
          {!this.state.isLogIn && <label className="m-2">{translation.HELLO}, {translation.GUEST}</label>}
          {this.state.isLogIn && <label className="m-2">{translation.HELLO}, {this.state.user.name}</label>}
          {this.state.isLogIn && <button className="btn btn-outline-primary btn-logout" onClick={this.handleLogOut}> {translation.LOGOUT} </button>}
        </div>
        <div className="row p-2 border border-primary main-row">
          <div className="col col-3 p-2 border border-primary">
            <MenuComponent userRole={this.state.userRole} isLogIn={this.state.isLogIn} />
          </div>
          <div className="col col-9">
            <ContentComponent user={this.state.user} isLogIn={this.state.isLogIn} logInMassage={this.state.logInMassage} tryLogin={(userEmail, userPassword) => this.tryLogin(userEmail, userPassword)} logOut={this.handleLogOut} />
          </div>
        </div>
      </div>
    );
  }
}

function test(params) {

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
    time = + (end - start);
  }
  console.log('time_for', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    arr.forEach(function (item) {
      a = "item " + item;
    });
    const end = new Date().getTime();
    time = + (end - start);
  }
  console.log('time_foreach', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    a = arr.map(function (item) {
      return "item " + item;
    });
    const end = new Date().getTime();
    time = + (end - start);
  }
  console.log('time_map', time / repete);


  for (let n = 0; n < repete; n++) {
    const start = new Date().getTime();
    a = arr.reduce(function (sum, current) {
      return "item " + current;
    });
    const end = new Date().getTime();
    time = + (end - start);
  }
  console.log('time_ruduse', time / repete);
}
