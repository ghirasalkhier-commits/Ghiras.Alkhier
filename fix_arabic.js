const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix cart.js or product.html question marks
    content = content.replace(/\?\?\?\?\?\? \?\? \?\?\?\? \?\?\?\? \?\?\?\?\? \?\? \?\?\?\?\?\?\?!/g, 'عذراً، لا توجد كمية كافية في المخزون!');
    content = content.replace(/\?\?\?\?\?\? \?\?\? \?\?\?\?\?\? \?\?\? \?\?\?\?\? \?\?\?\?\?\?!/g, 'عذراً، هذا المنتج غير متوفر حالياً!');
    content = content.replace(/\?\?\?\?\?\? \?\?\?\?\?\? \?\?\?\?\?\?\?\? \?\?\?\?\?\? \?\?\? \?\?\?\?\? \?\?\?\?\?\?\?!/g, 'عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!');
    
    // In product.html, we need to assign window.currentProductStock
    if (file === 'product.html' && !content.includes('window.currentProductStock')) {
        content = content.replace(
            "document.getElementById('hero-image-container').innerHTML =",
            "window.currentProductStock = p.stock;\n            document.getElementById('hero-image-container').innerHTML ="
        );
        
        content = content.replace(
            "let v = parseInt(val.innerText);\n                val.innerText = v + 1;",
            "let v = parseInt(val.innerText);\n                if (window.currentProductStock !== undefined && v >= window.currentProductStock) {\n                    if (window.Cart && window.Cart.showToast) { window.Cart.showToast('عذراً، لا توجد كمية كافية في المخزون!', true); } else { alert('عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!'); }\n                    return;\n                }\n                val.innerText = v + 1;"
        );
        
        content = content.replace(
            "currentQty++;\n        qtyValue.textContent = currentQty;",
            "if (window.currentProductStock !== undefined && currentQty >= window.currentProductStock) {\n            if (window.Cart && window.Cart.showToast) { window.Cart.showToast('عذراً، لا توجد كمية كافية في المخزون!', true); } else { alert('عذراً، الكمية المطلوبة تتجاوز عدد القطع المتاحة!'); }\n            return;\n        }\n        currentQty++;\n        qtyValue.textContent = currentQty;"
        );
    }
    
    fs.writeFileSync(file, content, 'utf8');
}

fixFile('cart.js');
fixFile('product.html');
console.log('Fixed correctly via Node!');
