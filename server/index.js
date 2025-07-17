const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});