import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import AuthService from '../../Services/auth';

import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';

import "react-datepicker/dist/react-datepicker.css";
import './Profile.css';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      address: '',
      birthDay: '',

      currentPassword: '',
      newPassword: ''
    }

    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  UNSAFE_componentWillMount () {
    if (this.Auth.loggedIn()) {
      this.Auth.currentUser()
        .then((data) => {
          this.setState({
            email: data.user.email,
            phone: data.user.phone,
            address: data.user.address,
            birthDay: Date.parse(data.user.birthDay),
          })
        })
    } else {
      this.props.history.replace('/login');
    }
  }

  render () {
    return (
      <nav className="Profile">
        <Navigation />
        <section className="header">
          <div className="container">
            <h1> {this.state.email} </h1>
          </div>
        </section>
        <section className="info">
          <div className="container">
            <form onSubmit={this.handleUpdateProfile}>
              <h3>Update your informations</h3>
              <div className="row p-06">
                <div className="form-group col-lg-6">
                  <label htmlFor="phoneInput">Current Email</label>
                  <input 
                    className="form-controle"
                    type="email"
                    name="email"
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    required 
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label htmlFor="phoneInput">Phone</label>
                  <input 
                    className="form-controle"
                    type="number"
                    name="phone"
                    defaultValue={this.state.phone}
                    onChange={this.handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="row p-06">
                <div className="form-group col-lg-6">
                  <label htmlFor="passwordInput">Address</label>
                  <input
                    className="form-controle"
                    type="text"
                    name="address"
                    defaultValue={this.state.address}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label htmlFor="passwordInput">Date of birth</label>
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

              <button className="btn btn-black" type="submit">Update</button>
            </form>

            <hr />

            <form onSubmit={this.handleUpdatePassword}>
              <h3>Update Password</h3>
              <div className="row p-06">
                <div className="form-group col-lg-6">
                  <label htmlFor="phoneInput">Current Password</label>
                  <input 
                    className="form-controle"
                    type="password"
                    name="currentPassword"
                    onChange={this.handleChange}
                    required 
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label htmlFor="passwordInput">New Password</label>
                  <input
                    className="form-controle"
                    type="password"
                    name="newPassword"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              
              <button className="btn btn-black" type="submit">Update</button>
            </form>
          </div>
        </section>
        <Footer />
      </nav>
    )
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleUpdateProfile () {
    try {
      const { email, phone, address, birthDay } = this.state
      const user = {
        email: email,
        phone: phone,
        address: address,
        birthDay: birthDay
      }
      this.Auth.updateUser(user)
      .then((data) => {
        this.setState({
          email: data.user.email,
          phone: data.user.phone,
          address: data.user.address,
          birthDay: Date.parse(data.user.birthDay),
        })
      })
		} catch(error) {
			alert(error.message)
		}
  }
  
  async handleUpdatePassword (e) {
    e.preventDefault();
		try {
      const { email, currentPassword, newPassword } = this.state
      const user = {
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword
      }

      console.log(user, 'console.log(user)')
      await this.Auth.updatePassword(user)
        .then(data => {
          alert('Your password has been correctly updated!')
        })
		} catch(error) {
			alert(error.message)
		}
	}
};

export default Profile;
