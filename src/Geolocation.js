import React, { Component } from 'react';

class Geolocation extends Component {
  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Handle the user's location data here
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // You can use latitude and longitude to perform actions based on geolocation.
      });
    } else {
      // Geolocation is not available in this browser
      // Handle accordingly, e.g., by showing a message to the user
    }
  }

  render() {
    return (
      <div>
        {/* Component UI goes here */}
      </div>
    );
  }
}

export default Geolocation;
