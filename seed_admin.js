require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => client.query("SELECT * FROM users WHERE email = 'ghirasalkhier@gmail.com'"))
  .then(res => {
    if (res.rows.length === 0) {
      console.log("Seeding admin...");
      return client.query(`INSERT INTO users (email, password, firstName, lastName, role, provider) 
                           VALUES ('ghirasalkhier@gmail.com', 'ahlalkhair123', 'Admin', 'Ghiras', 'admin', 'local')`);
    } else {
      console.log("Admin already seeded.");
    }
  })
  .then(() => {
    console.log("Done.");
    client.end();
  })
  .catch(err => {
    console.error("Error:", err);
    client.end();
  });
