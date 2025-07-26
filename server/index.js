const express = require('express');
const mysql = require('mysql2/promise'); 

const app = express();
const PORT = 3010;

app.use(express.static('public'));

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'FFLodeDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to check the connection
async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Test the connection
    connection.release();    // Release back to the pool
    console.log('Database pool connection successful');
  } catch (err) {
    console.error('Failed to connect to database pool:', err);
    throw err;
  }
}

async function startServer() {
  try {
    await checkDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);  // exit if DB is not ready
  }
}

app.get('/api/information', async (req, res) => {
  try {
    const response = await fetch('https://v2.xivapi.com/api/sheet/Achievement?rows=&limit=15');
    const externalData = await response.json()
    ;
    
    if(!externalData){
        return res.status(404).json({error: 'Data not found'});
    }

    res.json(externalData.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

startServer();
