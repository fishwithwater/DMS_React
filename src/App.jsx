import React, { Component } from 'react';
import PropTypes from "prop-types";
import './App.css';
import LoginPage from './pages/LoginPage'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      userInfo: {}
    }
  }

  setLoginInfo = (login, userInfo) => {
    console.log('App.js@setLoginInfo');
    console.log(login);
    console.log(userInfo);
    this.setState(
      {
        login: login,
        userInfo: userInfo
      }
    );
  };


  getChildContext() {
    return {
      login: this.state.login,
      userInfo: this.state.userInfo,
      setLoginInfo: this.setLoginInfo
    };
  }

  render() {
    return (
      <div>
        <LoginPage />
      </div>

    );
  }
}

App.childContextTypes = {
  login: PropTypes.bool,
  userInfo: PropTypes.object,
  setLoginInfo: PropTypes.func
};


export default App;