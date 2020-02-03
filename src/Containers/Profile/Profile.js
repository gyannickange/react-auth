import React, { Component } from "react";
import DatePicker from "react-datepicker";

import AuthService from "../../Services/auth";

import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";

import "react-datepicker/dist/react-datepicker.css";
import "./Profile.css";

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      _id: '',
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
      const currentUser = this.Auth.currentUser()
      this.setState({
        _id: currentUser._id,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        password: currentUser.password,
        birthDay: Date.parse(currentUser.birthDay),
      })
    } else {
      this.props.history.replace('/login');
    }

    this.Auth.getAllUser()
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

  async handleUpdateProfile (e) {
    try {
      const { _id, email, password, phone, address, birthDay } = this.state
      const user = {
        _id: _id,
        email: email,
        password: password,
        phone: phone,
        address: address,
        birthDay: birthDay
      }
      
      await this.Auth.updateUser(user);
      const currentUser = await this.Auth.currentUser();

      this.setState({
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        birthDay: Date.parse(currentUser.birthDay),
      })
		} catch(error) {
			alert(error.message)
		}
  }
  
  async handleUpdatePassword (e) {
		try {
      const { _id, email, currentPassword, newPassword } = this.state
      const user = {
        _id: _id,
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword
      }

      await this.Auth.updatePassword(user);
      await this.Auth.currentUser();

      alert('Your password has been correctly updated!');
		} catch(error) {
			alert(error.message)
		}
	}
};

export default Profile;
