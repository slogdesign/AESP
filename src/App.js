import React, { Component } from 'react';
import Geolocation from './Geolocation';
import './App.css';
const aespdb = require('./aespdb'); // Import the aespdb object

class App extends Component {
  state = {
    organizations: [],
  };

  componentDidMount() {
    // Fetch organizations from the database
    aespdb.any('SELECT * FROM aesptable')
      .then(data => {
        console.log('Fetched organizations:', data);
        this.setState({ organizations: data });
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }

  render() {
    return (
      <div className="App">
        <section className="main">
          <h1>ALTERNATIVE EMERGENCY LINES TO POLICE</h1>
        </section>
        <div className="grid">
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
