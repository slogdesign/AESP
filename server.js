const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define your desired port number

// Middleware and route setup go here
// Define API routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });
  // Add more API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
