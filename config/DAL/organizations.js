const { Pool } = require('pg'); // Import the PostgreSQL client library
const pool = new Pool(); // Create a PostgreSQL connection pool

// Define the table name
const tableName = 'organizations';

// Function to get all organizations from the database
const getAllOrganizations = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${tableName}`);
    client.release();
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Function to add a new organization to the database
const addOrganization = async (organizationData) => {
  try {
    const client = await pool.connect();
    const { name, phoneNumber } = organizationData;
    const result = await client.query(
      `INSERT INTO ${tableName} (name, phoneNumber) VALUES ($1, $2) RETURNING *`,
      [name, phoneNumber]
    );
    client.release();
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Export the functions for use in other parts of your application
module.exports = {
  getAllOrganizations,
  addOrganization,
};
