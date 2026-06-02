const https = require('https');

https.get('https://docs.google.com/spreadsheets/d/1Pe2CutV78Hd6ogCB8kZlEjEgqK5Tn1bRoJZw_PYqc3k/edit', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/\\\["([^"]+)",(\d+)\\\]/g);
    console.log("Matches:", matches);
    
    // Also try to find "categories" and "products" directly
    const catIndex = data.indexOf('categories');
    const prodIndex = data.indexOf('products');
    console.log("cat index:", catIndex, data.substring(catIndex - 50, catIndex + 50));
    console.log("prod index:", prodIndex, data.substring(prodIndex - 50, prodIndex + 50));
  });
});
