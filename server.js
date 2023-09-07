const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define your desired port number

// Middleware and route setup go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
