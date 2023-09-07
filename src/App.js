import React, { Component } from 'react';
import Geolocation from './Geolocation';
import './App.css';

class App extends Component {
  state = {
    organizations: [],
  };

  render() {
    return (
      <div className="App">
        <section className="main">
          <h1>ALTERNATIVE EMERGENCY LINES TO POLICE</h1>
        </section>
        <div className="grid">
          {/* Main buttons */}
          <a href="#mentalHealth" className="button2">
            Mental Health Services
          </a>
          <a href="#domesticViolence" className="button3">
            Domestic Violence Support
          </a>
          <a href="#lgbtq" className="button4">
            LGBTQ+ Support
          </a>
          <a href="#elderlyServices" className="button7">
            Elderly Services
          </a>

          {/* Display organizations here */}
          {this.state.organizations.map(org => (
            <a href={`tel:${org.PhoneNumber1}`} className="button1" key={org.OrganizationName}>
              {org.OrganizationName}
            </a>
          ))}
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
