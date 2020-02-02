import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img from '../../assets/images/img2.jpg'
import './Main.css';

class Main extends Component {
  render () {
    return (
      <main className="Main">
        <section className="banner overlay-gradient">
          <div className="container-fluid">
            <div className="headline">
              <div className="content">
                <h1 className="banner-title">Vestibulum ut dolor dictum, tincidunt velit eu.</h1>
                <p className="banner-subtitle">Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ante eros, bibendum et aliquet.</p>
                <Link className="btn btn-outline-black" to="">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="about">
          <div className="container">
            <div className="row text-center align-items-center">
              <div className="col-lg-6">
                <img className="img-fluid" src={img} alt="About" />
              </div>
              <div className="col-lg-6">
                <h3>About us</h3>
                <h2>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </h2>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a 
                  type specimen book. It has survived not only five centuries
                </p>
                <p>
                  But also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing 
                  Lorem Ipsum passages, and more recently with desktop publishing software like 
                  Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Main;
