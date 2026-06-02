const https = require('https');

const clientId = '243818682762-0gidrn9ft8vc5aff5fm3eognstfr4bdb.apps.googleusercontent.com';
const origin = 'http://localhost:3000';

const options = {
  hostname: 'accounts.google.com',
  port: 443,
  path: `/gsi/button?type=standard&client_id=${clientId}`,
  method: 'GET',
  headers: {
    'Origin': origin,
    'Referer': `${origin}/`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    // console.log(d.toString());
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
