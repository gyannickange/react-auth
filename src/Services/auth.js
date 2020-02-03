import db from '../db/index'

export default class AuthService {
  constructor () {
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.currentUser = this.currentUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
  }

  login (userData, history) {
    db.findEmail('users', userData.email, (err, user) => {
      if (user) {
        if (userData.pass === user.pass) {
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
    db.findOne('users', { email: userData.email }, (err, user) => {
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
    console.log(currentUser, 'setUser')
    localStorage.setItem('current_user',  JSON.stringify(currentUser));
  }

  getUser () {
    return localStorage.getItem('current_user');
  }

  currentUser () {
    const currentUser = this.getUser();
    return JSON.parse(currentUser);
  }

  updateUser (user) {
    localStorage.removeItem('current_user');
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  updatePassword (user) {
    // const user = this.getUser();
    // return user
  }

  getAllUser () {
    db.find('users', (err, users) => {
      console.log(users, 'alluser')
    })
  }
}