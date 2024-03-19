const mysql = require('mysql2');
require('dotenv').config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};
const dburl = `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Function to establish database connection
const connectToDatabase = () => {
  console.log("Connecting to DB..");
  // Create a connection using the configuration
  const connection = mysql.createConnection(dburl);
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  // Return the connection object
  return connection;
}
// Export the function to be used in other files
module.exports = connectToDatabase;

