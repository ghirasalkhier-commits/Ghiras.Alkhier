const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://localhost:3000/admin.html');
    
    // Wait for the products list to populate
    await page.waitForSelector('#products-list', { timeout: 5000 });
    
    // Wait an extra second for fetch
    await new Promise(r => setTimeout(r, 1000));
    
    const html = await page.$eval('#products-list', el => el.innerHTML);
    console.log("Products List HTML:");
    console.log(html);
    
    await browser.close();
})();
