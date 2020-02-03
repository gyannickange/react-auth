import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import AuthService from '../../../Services/auth';

import Logo from '../../../assets/images/logo.png';

import '../Auth.css';

class Login extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
    }

    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillMount () {
    if (this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render () {
    return (
      <div className="Auth">
        <div className="spacing">
          <div className="auth-form">
            <form onSubmit={this.handleSubmit}>
              <div className="form-header">
                <img src={Logo} width="50" alt="Logo" />
              </div>
              <h1 className="auth-name">Login</h1>
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input 
                    className="form-controle"
                    type="email"
                    name="email"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    className="form-controle"
                    type="password"
                    name="password"
                    required 
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-footer">
                <button className="btn btn-black" type="submit">Login</button> <br />
                <div>
                  Don't have an acompte 
                  <Link to="/signup"> Sign up</Link> or <br />
                  <Link className="btn" to="/"> Go to Home </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit (e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.Auth.login(user)
      .then(res => {
        this.props.history.replace('/profile');
      })
  }
}

export default withRouter(Login);
