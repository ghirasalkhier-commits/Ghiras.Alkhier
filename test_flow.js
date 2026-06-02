const token = 'ghirasalkhier@gmail.com'; // Wait, let me fetch and test it!

async function testFlow() {
    console.log("1. Logging in...");
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ghirasalkhier@gmail.com', password: 'ahlalkhair123' })
    });
    
    if (!loginRes.ok) {
        console.error("Login failed!", await loginRes.text());
        return;
    }
    
    const data = await loginRes.json();
    console.log("Login success! Token:", data.token.substring(0, 20) + "...");
    console.log("User data:", data.user);
    
    const jwtToken = data.token;
    
    console.log("2. Fetching profile...");
    const profileRes = await fetch(`http://localhost:3000/api/profile/${data.user.email}`, {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
    });
    
    if (!profileRes.ok) {
        console.error("Profile fetch failed!", await profileRes.text());
    } else {
        console.log("Profile success!", await profileRes.json());
    }
    
    console.log("3. Fetching admin orders...");
    const ordersRes = await fetch(`http://localhost:3000/api/admin/orders`, {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
    });
    
    if (!ordersRes.ok) {
        console.error("Admin orders failed!", await ordersRes.text());
    } else {
        console.log("Admin orders success! Count:", (await ordersRes.json()).length);
    }
}

testFlow();
