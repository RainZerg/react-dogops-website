import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'dogops_admin', // Replace with your PostgreSQL username
  host: 'localhost', // Docker service name for the database
  database: 'dogops_website_db', // Replace with your PostgreSQL database name
  password: 'rain166rain', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

export default pool;