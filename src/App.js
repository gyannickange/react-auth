import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Containers/Home/Home'
import Profile from './Containers/Profile/Profile'
import Login from './Containers/Auth/Login/Login'
import Signup from './Containers/Auth/Signup/Signup'
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    )
  }
}

export default App;
