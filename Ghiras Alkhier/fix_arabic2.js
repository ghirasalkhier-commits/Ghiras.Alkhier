const fs = require('fs');

function fixCart() {
    let content = fs.readFileSync('cart.js', 'utf8');
    
    // Fix toast 1
    content = content.replace(/'\?\?\?\?\?\? \?\? \?\?\?\? \?\?\?\? \?\?\?\?\? \?\? \?\?\?\?\?\?\?!'/g, "'عذراً، لا توجد كمية كافية في المخزون!'");
    
    // Fix toast 2
    content = content.replace(/'\?\?\?\?\?\? \?\?\? \?\?\?\?\?\? \?\?\? \?\?\?\?\? \?\?\?\?\?\?!'/g, "'عذراً، هذا المنتج غير متوفر حالياً!'");

    fs.writeFileSync('cart.js', content, 'utf8');
}

function fixProduct() {
    let content = fs.readFileSync('product.html', 'utf8');
    
    content = content.replace(/'\?\?\?\?\?\? \?\? \?\?\?\? \?\?\?\? \?\?\?\?\? \?\? \?\?\?\?\?\?\?!'/g, "'عذراً، لا توجد كمية كافية في المخزون!'");
    content = content.replace(/'\?\?\?\?\?\? \?\?\?\?\?\? \?\?\?\?\?\?\?\? \?\?\?\?\?\? \?\?\? \?\?\?\?\? \?\?\?\?\?\?\?!'/g, "'عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!'");

    // Add window.currentProductStock assignment
    if (!content.includes('window.currentProductStock')) {
        content = content.replace(
            "document.getElementById('hero-image-container').innerHTML =",
            "window.currentProductStock = p.stock;\n            document.getElementById('hero-image-container').innerHTML ="
        );
    }

    // Fix qty-plus #1 (lines 189)
    if (!content.includes('window.currentProductStock !== undefined && currentQty >=')) {
        content = content.replace(
            /document\.getElementById\('qty-plus'\)\.addEventListener\('click', \(\) => \{\s*currentQty\+\+;\s*qtyValue\.textContent = currentQty;\s*\}\);/,
            "document.getElementById('qty-plus').addEventListener('click', () => { if (window.currentProductStock !== undefined && currentQty >= window.currentProductStock) { if (window.Cart && window.Cart.showToast) { window.Cart.showToast('عذراً، لا توجد كمية كافية في المخزون!', true); } else { alert('عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!'); } return; } currentQty++; qtyValue.textContent = currentQty; });"
        );
    }
    
    // Fix qty-plus #2 (lines 314-328)
    if (!content.includes('window.currentProductStock !== undefined && v >=')) {
        content = content.replace(
            /plus\.onclick = \(\) => \{\s*let v = parseInt\(val\.innerText\);\s*val\.innerText = v \+ 1;\s*\};/,
            "plus.onclick = () => { let v = parseInt(val.innerText); if (window.currentProductStock !== undefined && v >= window.currentProductStock) { if (window.Cart && window.Cart.showToast) { window.Cart.showToast('عذراً، لا توجد كمية كافية في المخزون!', true); } else { alert('عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!'); } return; } val.innerText = v + 1; };"
        );
    }

    fs.writeFileSync('product.html', content, 'utf8');
}

fixCart();
fixProduct();
console.log('Fixed correctly via Node!');
