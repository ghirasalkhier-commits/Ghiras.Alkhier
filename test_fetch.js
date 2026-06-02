fetch('http://localhost:3000/api/products?all=1')
  .then(res => res.json())
  .then(data => {
    console.log(`Fetched ${data.length} products`);
    data.forEach(p => console.log(`- ${p.name} (Visible: ${p.is_visible})`));
  })
  .catch(console.error);
