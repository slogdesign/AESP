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
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

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
    // Convert latitude and longitude from degrees to radians
    const degToRad = (degrees) => (degrees * Math.PI) / 180;
    const radius = 6371; // Radius of the Earth in kilometers

    const lat1Rad = degToRad(lat1);
    const lon1Rad = degToRad(lon1);
    const lat2Rad = degToRad(lat2);
    const lon2Rad = degToRad(lon2);

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distance = radius * c;

    return distance;
  };

  render() {
    return (
      <div className="App">
        <a href="https://www.slogdesign.io" target="_blank" rel="noopener noreferrer">
          <img src="https://www.slogdesign.io/wp-content/uploads/2023/06/SLOGO2-1.png" alt="SLOGO" className="logo" />
        </a>

        {/* LGBTQ+ Card */}
        <section className="hero-section">
          <div className="card-grid">
            <a className="card card__lgbtq" href="#">
              <div className="card__background" style={{ backgroundImage: "url('https://images.pexels.com/photos/3693901/pexels-photo-3693901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">LGBTQ+ SUPPORT</h3>
                <p className="card__photographer">(cottonbro studio)</p>
              </div>
            </a>

            {/* Domestic Violence Card */}
            <a className="card card__domesticviolence" href="#">
              <div className="card__background" style={{ backgroundImage: "url('https://images.pexels.com/photos/6757341/pexels-photo-6757341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">DV ASSISTANCE</h3>
                <p className="card__photographer">(Mariana Montrazi)</p>
              </div>
            </a>

            {/* Mental Health Card */}
            <a className="card card__mentalhealth" href="#">
              <div className="card__background" style={{ backgroundImage: "url('https://images.pexels.com/photos/7654802/pexels-photo-7654802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">MENTAL HEALTH CRISIS</h3>
                <p className="card__photographer">(Elijah O'Donnell)</p>
              </div>
            </a>

            {/* Elderly Services Card */}
            <a className="card card__elderlyservices" href="#">
              <div className="card__background" style={{ backgroundImage: "url('https://images.pexels.com/photos/2586537/pexels-photo-2586537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">ELDERLY PROTECTION SERVICES</h3>
                <p className="card__photographer">(Vlad Chețan)</p>
              </div>
            </a>
          </div>
        </section>

        {/* Don't Call the Police and 911 Buttons */}
        <section className="button-grid"> {/* Use a separate section for buttons */}
          <a className="button" href="https://www.dontcallthepolice.com" target="_blank" rel="noopener noreferrer">Don't Call the Police</a>
          <a className="button" href="tel:911">911</a>
        </section>
      </div>
    );
  }
}

export default App;
