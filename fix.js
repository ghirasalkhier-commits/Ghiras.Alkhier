const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.run("UPDATE users SET country = 'Jordan' WHERE country IS NULL OR country = 'Unknown'", [], function(err) {
    console.log('Updated rows:', this.changes);
});
