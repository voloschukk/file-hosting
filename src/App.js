import './App.css';
import React, { Component } from 'react';
import Menu from './Menu';
import Content from './Content';

const usersList = [{ id: 0, name: 'user1', email: 'user1@gmail.com', password: 'password1', group: 'admin' }];
localStorage.setItem("usersList", JSON.stringify(usersList));

<script src="http://localhost:8097"></script>

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          LOGO
        </header>
        <div className="main">
          <div className="menu-bar">
            <Menu />
          </div>
          <div className="contetnt-bar">
            <Content />
          </div>
        </div>
      </div>
    );
  }
}

export default App
