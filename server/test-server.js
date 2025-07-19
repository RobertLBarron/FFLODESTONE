const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello from test server!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
