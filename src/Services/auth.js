import db from '../db/index'

export default class AuthService {
  constructor () {
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.currentUser = this.currentUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

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
    })
  }

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
    })
  }

  logout () {
    localStorage.removeItem('current_user');
  }

  loggedIn () {
    const user = this.getUser();
    return !!user
  }

  setUser (currentUser) {
    localStorage.setItem('current_user',  JSON.stringify(currentUser));
  }

  getUser () {
    return localStorage.getItem('current_user');
  }

  currentUser () {
    const currentUser = this.getUser();
    return JSON.parse(currentUser);
  }

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
    })
  }
}