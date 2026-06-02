const fs = require('fs');
const html = fs.readFileSync('checkout.html', 'utf8');

// Extract the script tag content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/g);
let js = scriptMatch[1].replace('<script>', '').replace('</script>', '');
js = scriptMatch[2].replace('<script>', '').replace('</script>', '');

console.log("Extracted JS length:", js.length);

// Mock browser environment
const dom = {
    document: {
        addEventListener: (event, cb) => {
            if (event === 'DOMContentLoaded') {
                setTimeout(cb, 10);
            }
        },
        getElementById: (id) => {
            return {
                id: id,
                classList: {
                    contains: () => false,
                    add: () => {},
                    remove: () => {}
                },
                style: {},
                querySelector: () => null,
                innerText: 'JOD 0.00',
                value: ''
            };
        }
    },
    window: {},
    localStorage: {
        getItem: (key) => {
            if (key === 'currentUser') return JSON.stringify({ email: 'test@test.com', name: 'Zim Zim', phone: '123' });
            if (key === 'ghiras_cart_test@test.com') return JSON.stringify([{ id: 1, name: 'P', price: 10, quantity: 2, image: 'img.png' }]);
            return null;
        },
        setItem: () => {},
        removeItem: () => {}
    }
};

const fn = new Function('document', 'window', 'localStorage', js);

try {
    fn(dom.document, dom.window, dom.localStorage);
    console.log("Script executed successfully. Waiting for DOMContentLoaded...");
    setTimeout(() => {
        console.log("Callbacks executed. No errors.");
    }, 100);
} catch (e) {
    console.log("ERROR:", e);
}
