const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.all('SELECT * FROM orders ORDER BY id DESC LIMIT 2', (err, rows) => {
    console.log(JSON.stringify(rows, null, 2));
});
