import './App.css';
import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Content from '../Content/Content';

const usersList = [{ id: 0, name: 'user1', email: 'user1@gmail.com', password: 'password1', group: 'admin' }];
localStorage.setItem("usersList", JSON.stringify(usersList));

<script src="http://localhost:8097"></script>

class App extends Component {

  render() {
    return (
      <div className="container-md App">
        <header className="row border p-2 border-primary ">
          LOGO
        </header>
        <div className="row  p-2 border border-primary">
          <div className="menu-bar p-2 border border-primary col col-3">
            <Menu />
          </div>
          <div className="contetnt-bar col col-9 ">
            <Content />
          </div>
        </div>
      </div>
    );
  }
}

export default App
