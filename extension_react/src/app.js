/*global chrome*/

import React, { Component } from 'react';
import AppDashboard from './dashboard/Dashboard';
import AppLogin from './login/Login';
import './common/style.css';

class App extends Component {

  constructor(props) {
    super(props);

    // check user login
    let isLoggedIn = false;
    chrome.storage.sync.get('oauth_token', function(data) { // get the token from storage
      // check to see if the token is the default value set on install
      if(data.oauth_token != '') {
        isLoggedIn = true;
      }
    });

    this.state = {
      isLoggedIn: isLoggedIn,
    }
    this.loginFunction = this.handleLogin.bind(this);
    this.logoutFunction = this.handleLogout.bind(this);
  }

  // handles user login function
  handleLogin() {
    // get token and save to storage
    chrome.storage.sync.set({"oauth_token": "some_token_here"}, function() {
        console.log("logged in. token set");
    })

    this.setState({
      isLoggedIn: true, // set user state to logged in
    });
  }

  // handles logout action
  handleLogout() {
    // remove token from storage
    chrome.storage.sync.set({"oauth_token": ""}, function() {
      console.log("logged out. token removed");
    })

    this.setState({
      isLoggedIn: false, // set user state to logged in
    });
  }

  render() {

    let appContent;
    if(this.state.isLoggedIn){ // user is logged in
      appContent = <AppDashboard  logoutFunction={this.logoutFunction}/>;
    }else{ // user not logged in
      appContent = <AppLogin loginFunction={this.loginFunction}/>;
    }

    return (
      <div className="app-body">
        {appContent}
      </div>
    );
  }
}

export default App;
