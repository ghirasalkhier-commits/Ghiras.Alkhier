const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Listen to console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('PAGE LOG ERROR:', msg.text());
        } else {
            console.log('PAGE LOG:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log('PAGE ERROR:', error.message);
    });

    // Mock local storage
    await page.evaluateOnNewDocument(() => {
        localStorage.setItem('currentUser', JSON.stringify({ email: 'test@example.com', name: 'Test User', phone: '791234567' }));
        localStorage.setItem('ghiras_cart_test@example.com', JSON.stringify([
            { id: 1, name: "Test Plant", price: 10, quantity: 1, image: "test.png", stock: 5 }
        ]));
    });

    const fileUrl = 'file://' + require('path').resolve('checkout.html');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    await browser.close();
})();
