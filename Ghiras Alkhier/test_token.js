const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ghiras-alkhier-super-secure-secret-key-2024';

const token = jwt.sign(
    { id: 1, email: 'ghirasalkhier@gmail.com', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
);

console.log("Token:", token);

try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded:", decoded);
} catch (err) {
    console.log("Verification Failed:", err.message);
}
