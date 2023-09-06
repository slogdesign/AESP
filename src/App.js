import React, { Component } from 'react';
import Geolocation from './Geolocation'; // Import the Geolocation component
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="main">
          <h1>ALTERNATIVE EMERGENCY LINES TO POLICE</h1>
        </section>
        <div className="grid">
          <a href="tel:1 (800) 854-7771" className="button1" id="b1">
            Mental Health Crisis
          </a>
          <a href="tel:1 (800) 479-7328" className="button2" id="b2">
            Domestic Violence & SA
          </a>
          <a href="something" className="button3" id="b3">
            LGBTQ+ Counseling & Legal Help
          </a>
          <a href="tel:1 (877) 477-3646" className="button4" id="b4">
            Elderly Protective Services
          </a>
        </div>
        <div className="responsive-buttons">
          <a href="https://dontcallthepolice.com/los-angeles/" className="button5" id="b5">
            Don't Call The Police
          </a>
          <a href="tel:911" className="button6" id="b6">
            911
          </a>
        </div>
        {/* Include the Geolocation component here */}
        <Geolocation />
      </div>
    );
  }
}

export default App;
