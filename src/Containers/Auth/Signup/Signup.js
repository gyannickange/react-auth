import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";

import AuthService from '../../../Services/auth';

import Logo from '../../../assets/images/logo.png';

import '../Auth.css';
import "react-datepicker/dist/react-datepicker.css";

class Signup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      address: '',
      birthDay: '',
      question: {
        first: '',
        second: '',
        third: ''
      }
    }

    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  UNSAFE_componentWillMount () {
    if (this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render () {
    return (
      <div className="Auth">
        <div className="spacing">
          <div className="auth-form auth-form-xl">
            <form onSubmit={this.handleRegister}>
              <div className="form-header">
                <img src={Logo} width="50" alt="Logo" />
              </div>
              <h1 className="auth-name">Signup</h1>
              <div className="form-content">
                <div className="row p-06">
                  <div className="form-group col-lg-6">
                    <label htmlFor="emailInput">Email</label>
                    <input 
                      className="form-controle"
                      type="email" name="email"
                      onChange={this.handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label htmlFor="passwordInput">Password</label>
                    <input 
                      className="form-controle"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row p-06">
                  <div className="form-group col-lg-6">
                    <label htmlFor="phoneInput">Phone</label>
                    <input 
                      className="form-controle"
                      type="number"
                      name="phone"
                      onChange={this.handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label htmlFor="passwordInput">Address</label>
                    <input
                      className="form-controle"
                      type="text" name="address"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row p-06">
                  <div className="form-group col-lg-6">
                    <label htmlFor="phoneInput">Date of Birth</label>
                    <DatePicker
                      className="form-controle"
                      required
                      maxDate={new Date()}
                      selected={this.state.birthDay}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onChange={date =>
                        this.setState({
                          birthDay: date
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button className="btn btn-black" type="submit">Signup</button> <br />
                <div>
                  Already have an acompte 
                  <Link to="/login"> Login</Link> or  <br />
                  <Link to="/">Go to Home</Link>
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

  async handleRegister (e) {
    e.preventDefault();
    console.log(this.state, 'question')
		// try {
    //   const { email, password, phone, address, birthDay, question } = this.state
    //   const user = {
    //     email: email,
    //     password: password,
    //     phone: phone,
    //     address: address,
    //     birthDay: birthDay
    //   }
		// 	await this.Auth.signup(user)
		// 	this.props.history.replace('/profile')
		// } catch(error) {
		// 	console.log(error)
		// }
	}
}

export default withRouter(Signup);
