import React, { Component } from 'react';

import Navigation from '../../Components/Navigation/Navigation';
import Main from '../../Components/Main/Main';
import Footer from '../../Components/Footer/Footer';

import './Home.css';

class Home extends Component {
  render () {
    return (
      <div className="Home">
        <Navigation />
          <Main />
        <Footer />
      </div>
    )
  }
}

export default Home;
