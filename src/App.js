import React, { Component } from 'react';
import Geolocation from './Geolocation';
import './App.css';

class App extends Component {
  state = {
    organizations: [],
    userLocation: null, // Store user's location data here
  };

  componentDidMount() {
    //  Your API key goes here
    const apiKey = 'AIzaSyC_7wmilpa7AraTuZo-EQ66FVdRmBGsems';

    // Check if geolocation is available
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Get the user's latitude and longitude
        const { latitude, longitude } = position.coords;

        // Create the API request URL to convert coordinates to zip code
        const geoApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
          // Make the API request to get address components, including zip code
          const geoResponse = await fetch(geoApiUrl);
          if (!geoResponse.ok) {
            throw new Error('Failed to fetch geolocation data from the API');
          }

          const geoData = await geoResponse.json();

          // Extract the zip code from the response data
          const zipCode = this.extractZipCode(geoData);

          // Store the user's location and zip code in the state
          this.setState({
            userLocation: { latitude, longitude },
            userZipCode: zipCode,
          });

          // Now you can use the user's zip code to find the nearest organization
          const nearestOrg = await this.findNearestOrganization(zipCode);
          console.log('Nearest Organization:', nearestOrg);
        } catch (geoError) {
          console.error('Error fetching geolocation data:', geoError);
        }
      });
    } else {
      // Geolocation is not available in this browser
      // Handle accordingly, e.g., by showing a message to the user
    }
  }

  // Function to extract zip code from the geocoding response
  extractZipCode = (geoData) => {
    // Parse the response data to find the zip code
    const addressComponents = geoData.results[0]?.address_components || [];

    for (const component of addressComponents) {
      const types = component.types || [];
      if (types.includes('postal_code')) {
        return component.short_name;
      }
    }

    return null; // Zip code not found
  };

  // Function to find the nearest organization based on user's zip code
  findNearestOrganization = async (userZipCode) => {
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
    const apiUrl = `https://example.com/api/organizations?zipCode=${userZipCode}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }

      const data = await response.json();

      // Find the nearest organization based on user's zip code
      let nearestOrganization = null;
      let nearestDistance = Infinity;

      for (const org of data.organizations) {
        // Replace this with your distance calculation logic
        // Example: Haversine formula or any other suitable method
        const distance = this.calculateDistance(
          this.state.userLocation.latitude,
          this.state.userLocation.longitude,
          org.latitude,
          org.longitude
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestOrganization = org;
        }
      }

      return nearestOrganization;
    } catch (error) {
      throw error;
    }
  };

  // Function to calculate distance between two sets of coordinates
  calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Replace this with your distance calculation logic
    // Example: Haversine formula or any other suitable method
  };

  render() {
    return (
      <div className="App">
        <section className="main">
          <h1>ALTERNATIVE EMERGENCY LINES TO POLICE</h1>
        </section>
        <div className="grid">
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
          {this.state.organizations.map((org) => (
            <a
              href={`tel:${org.PhoneNumber1}`}
              className="button1"
              key={org.OrganizationName}
            >
              {org.OrganizationName}
            </a>
          ))}
        </div>
        <div className="responsive-buttons">
          <a
            href="https://dontcallthepolice.com/los-angeles/"
            className="button5"
            id="b5"
          >
            Don't Call The Police
          </a>
          <a href="tel:911" className="button6" id="b6">
            911
          </a>
        </div>
        <Geolocation />
      </div>
    );
  }
}

export default App;
