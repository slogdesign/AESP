const pool = require('./config/dbConfig'); // Update the path if needed

async function testDbConnection() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute a test query
    const result = await client.query('SELECT $1::text as message', ['Hello, PostgreSQL']);

    // Log the query result
    console.log('Database Connection Successful:');
    console.log(result.rows[0].message);

    // Release the client back to the pool
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    // Close the database pool (not recommended for production)
    pool.end();
  }
}

// Call the testDbConnection function
testDbConnection();
