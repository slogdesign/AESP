const pgp = require('pg-promise')();
const db = pgp({
    user: 'luna',          // Your PostgreSQL username
    password: 'wonderland', // Your PostgreSQL password
    host: 'localhost',     // Your PostgreSQL server host
    port: 5432,            // Your PostgreSQL server port
    database: 'aespdb'     // Your PostgreSQL database name (aespdb)
});
module.exports = db;
