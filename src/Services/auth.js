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

<<<<<<< HEAD
  login (userData, history) {
    db.findByEmail('users', userData.email, (err, user) => {
      if (user) {
        if (userData.password === user.password) {
          this.setUser(user)
          history.replace('/profile');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('Incorrect email');
      }
=======
  login (user) {
    return axios.post(`${this.domain}/login`, {
      user: user
    }, {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
      },
>>>>>>> parent of bac30a5... Added nedb
    })
      .then(res => {
        this.setToken(res.data.token)
        return Promise.resolve(res);
      })
      .catch((err) => {
        alert('Email or password not correct')
      })
  }

<<<<<<< HEAD
  signup (userData, history) {
    db.findByEmail('users', userData.email, (err, user) => {
      if (user && user.email === userData.email) {
        alert('Email is already existe');
      } else {
        db.insert('users', userData, (err, createdUser) => {
          this.setUser(createdUser);
          history.replace('/profile');
        })
      }
=======
  signup (user) {
    return axios.post(`${this.domain}/register`, {
      user: user
    }).then(res => {
      this.setToken(res.token)
      return Promise.resolve(res);
    }).catch((err) => {
      console.log(JSON.parse(JSON.stringify(err)))
      // alert('Email is already use')
>>>>>>> parent of bac30a5... Added nedb
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

<<<<<<< HEAD
  setUser (currentUser) {
    localStorage.setItem('current_user',  JSON.stringify(currentUser));
=======
  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
>>>>>>> parent of bac30a5... Added nedb
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

<<<<<<< HEAD
  updateUser (userData) {
    db.update('users', userData._id, userData, (err, updatededUser) => {
      db.findOne('users', userData._id, (err, user) => {
        localStorage.removeItem('current_user');
        localStorage.setItem('current_user', JSON.stringify(user));
      })
    })
  }

  updatePassword (userData) {
    db.findOne('users', { email: userData.email }, (err, user) => {
      if (user && user.password === userData.password) {
        db.updatePassword('users', userData._id, user.password, (err, updatededUser) => {
          db.findOne('users', userData._id, (err, user) => {
            localStorage.removeItem('current_user');
            localStorage.setItem('current_user', JSON.stringify(user));
          })
        })
      }
    })
  }
  
  getAllUser () {
    db.find('users', (err, users) => {
      console.log(users, 'alluser')
=======
  updateUser (user) {
    const token = this.getToken()
    const decoded = decode(token)
    return axios.put(`${this.domain}/user/${decoded.id}`, {
      user: user
    },{
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
      }
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
    },{
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
      }
>>>>>>> parent of bac30a5... Added nedb
    })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}