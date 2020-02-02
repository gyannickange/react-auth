import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
  constructor (domain) {
    this.domain = domain || 'https://app-jetcake.herokuapp.com'
    this.currentUser = this.currentUser.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.getProfile = this.getProfile.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

  login (user) {
    return axios.post(`${this.domain}/login`, {
      user: user
    })
      .then(res => {
        this.setToken(res.data.token)
        return Promise.resolve(res);
      })
      .catch((err) => {
        alert('Email or password not correct')
      })
  }

  signup (user) {
    console.log(user, 'user')
    return axios.post(`${this.domain}/register`, {
      user: user
    }).then(res => {
      this.setToken(res.token)
      return Promise.resolve(res);
    }).catch((err) => {
      alert('Email is already use')
    })
  }

  loggedIn () {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired (token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      else {
        return false;
      }  
    }
    catch (err) {
      return false;
    }
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    return localStorage.getItem('id_token')
  }

  logout () {
    localStorage.removeItem('id_token');
  }

  getProfile () {
    return decode(this.getToken());
  }


  currentUser () {
    const token = this.getToken()
    const decoded = decode(token)
    return axios.get(`${this.domain}/user/${decoded.id}`)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  updateUser (user) {
    const token = this.getToken()
    const decoded = decode(token)
    return axios.put(`${this.domain}/user/${decoded.id}`, {
      user: user
    })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  updatePassword (user) {
    return axios.put(`${this.domain}/update-password`, {
      user: user
    })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}