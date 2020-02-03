import React, { Component, Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import AuthService from '../../Services/auth';

import Logo from '../../assets/images/logo.png';

import './Navigation.css';

class Navigation extends Component {
  constructor (props) {
    super(props);

    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this)
  }

  render () {
    const  auth = this.Auth

    return (
      <nav className="Navigation">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} width="60" alt="Logo" />
          </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link">
                Profile
              </NavLink>
            </li>
            {
              auth.loggedIn() ?
              <li className="nav-item">
                <button
                  onClick={this.handleLogout}
                  className="nav-link btn btn-outline-black">
                  Logout
                </button>
              </li> :
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link btn btn-outline-black">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className="nav-link btn btn-black">
                    Sign Up
                  </NavLink>
                </li> 
              </Fragment>
            }
          </ul>
        </div>
      </nav>
    )
  }

  async handleLogout () {
    await this.Auth.logout()
    this.props.history.replace('/')
	}
};

export default withRouter(Navigation);
