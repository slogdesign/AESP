const { Pool } = require('pg');

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: 'luna',          // Your PostgreSQL username
  password: 'wonderland', // Your PostgreSQL password
  host: 'localhost',     // Your PostgreSQL host (usually 'localhost' for local development)
  port: 5432,            // Your PostgreSQL port (usually 5432)
  database: 'aespdb',    // Your PostgreSQL database name
});

module.exports = pool;
