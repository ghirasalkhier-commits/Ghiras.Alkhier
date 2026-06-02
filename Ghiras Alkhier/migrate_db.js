const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        return;
    }
    
    // Add role to users
    db.run(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`, (err) => {
        if (err) {
            console.log('role column might already exist:', err.message);
        } else {
            console.log('role column added to users');
        }
        
        // Add status to orders
        db.run(`ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending'`, (err) => {
            if (err) {
                console.log('status column might already exist:', err.message);
            } else {
                console.log('status column added to orders');
            }
            
            // Seed Admin User
            db.get(`SELECT * FROM users WHERE email = 'ghirasalkhier@gmail.com'`, (err, row) => {
                if (!row) {
                    db.run(`INSERT INTO users (email, password, firstName, lastName, role, provider) 
                            VALUES ('ghirasalkhier@gmail.com', 'ahlalkhair123', 'Admin', 'Ghiras', 'admin', 'local')`);
                    console.log('Admin user seeded.');
                } else {
                    db.run(`UPDATE users SET role = 'admin' WHERE email = 'ghirasalkhier@gmail.com'`);
                    console.log('Admin role updated for existing user.');
                }
                
                db.close();
            });
        });
    });
});
