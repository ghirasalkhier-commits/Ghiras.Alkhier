require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
  .then(res => {
    console.log("Tables in database:", res.rows.map(r => r.table_name));
    return client.query("SELECT count(*) FROM users");
  })
  .then(res => {
    console.log("Number of users:", res.rows[0].count);
    client.end();
  })
  .catch(err => {
    console.error("Error:", err);
    client.end();
  });
