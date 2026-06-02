require('dotenv').config();
const sqlite3 = require('./sqlite3-pg.js').verbose();

console.log("Connecting to Database:", process.env.DATABASE_URL.substring(0, 40) + "...");

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        process.exit(1);
    } else {
        console.log('Connected. Creating tables...');
        
        // Wait 5 seconds to ensure tables are created by the callbacks, then exit
        setTimeout(() => {
            console.log("Database initialized.");
            process.exit(0);
        }, 5000);
    }
});
