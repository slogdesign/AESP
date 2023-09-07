const { Pool } = require('pg'); // Import the PostgreSQL client library
const pool = new Pool(); // Create a PostgreSQL connection pool

// Define the table name
const tableName = 'aesptable';

// Function to convert zip code to coordinates using Google Maps Geocoding API
const convertZipCodeToCoordinates = async (zipCode) => {
  try {
    // Make an API request to convert the zip code to coordinates
    // Replace 'YOUR_GOOGLE_API_KEY' with your actual API key
    const apiKey = 'AIzaSyC_7wmilpa7AraTuZo-EQ66FVdRmBGsems';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    // Extract the latitude and longitude from the response
    const { lat, lng } = data.results[0].geometry.location;

    return { latitude: lat, longitude: lng };
  } catch (error) {
    throw error;
  }
};

// Function to calculate distance between two sets of coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Replace this with your distance calculation logic
  // Example: Haversine formula or any other suitable method
};

// Function to find the nearest organization based on user's zip code
const findNearestOrganization = async (userZipCode) => {
  try {
    // Convert user's zip code to coordinates
    const userCoordinates = await convertZipCodeToCoordinates(userZipCode);

    // Fetch all organizations from the database
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${tableName}`);
    client.release();

    // Find the nearest organization
    let nearestOrganization = null;
    let nearestDistance = Infinity;

    for (const org of result.rows) {
      const orgCoordinates = await convertZipCodeToCoordinates(org.ZipCode);
      const distance = calculateDistance(
        userCoordinates.latitude,
        userCoordinates.longitude,
        orgCoordinates.latitude,
        orgCoordinates.longitude
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

// Export the functions for use in other parts of your application
module.exports = {
  findNearestOrganization,
};
