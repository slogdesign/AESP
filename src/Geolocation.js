import React, { Component } from 'react';

class Geolocation extends Component {
  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.handleLocationSuccess, this.handleLocationError);
    } else {
      this.handleLocationError({ message: "Geolocation is not available in this browser" });
    }
  }

  handleLocationSuccess = (position) => {
    // Handle the user's location data here
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // You can use latitude and longitude to perform actions based on geolocation.
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  handleLocationError = (error) => {
    // Handle geolocation error
    console.error(`Geolocation error: ${error.message}`);
    // You can provide a user-friendly message or take other actions as needed.
  };

  render() {
    return null; // You can render some content here if needed.
  }
}

export default Geolocation;
