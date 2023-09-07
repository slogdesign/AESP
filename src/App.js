import React, { Component } from 'react';
import Geolocation from './Geolocation';
import './App.css';

class App extends Component {
  state = {
    organizations: [],
    userLocation: null, // Store user's location data here
  };

  componentDidMount() {
    // Access the API key from environment variables
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Replace 'YOUR_API_KEY' with your actual environment variable name

    // Check if geolocation is available
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Get the user's latitude and longitude
        const { latitude, longitude } = position.coords;

        // Store the user's location in the state
        this.setState({ userLocation: { latitude, longitude } });

        // Create the API request URL
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
          // Make the API request
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }

          // Parse the response data as JSON
          const data = await response.json();

          // You can now use the data from the Google Maps Geocoding API as needed
          console.log('Geocoding API Response:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } else {
      // Geolocation is not available in this browser
      // Handle accordingly, e.g., by showing a message to the user
    }
  }

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
