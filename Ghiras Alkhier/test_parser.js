const fs = require('fs');

function parseCSV(csv) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (insideQuotes) {
            if (char === '"' && nextChar === '"') {
                currentCell += '"';
                i++; // Skip the escaped quote
            } else if (char === '"') {
                insideQuotes = false;
            } else {
                currentCell += char;
            }
        } else {
            if (char === '"') {
                insideQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if (char === '\n' || char === '\r') {
                if (currentCell !== '' || currentRow.length > 0) {
                    currentRow.push(currentCell.trim());
                    rows.push(currentRow);
                }
                currentRow = [];
                currentCell = '';
                if (char === '\r' && nextChar === '\n') i++; // Skip Windows line endings
            } else {
                currentCell += char;
            }
        }
    }
    
    // Add the last row if not empty
    if (currentCell !== '' || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }

    if (rows.length === 0) return [];

    const headers = rows[0];
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;
        
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            let val = row[j] || '';
            // Convert to numbers if applicable, e.g., price, stock, is_visible
            if (!isNaN(val) && val.trim() !== '') {
                val = Number(val);
            }
            obj[headers[j]] = val;
        }
        data.push(obj);
    }

    return data;
}

const csvStr = `"id","name","image","is_visible"
"12","good","/uploads/1780023515569-746509028.jpg","1"
"13","??","/uploads/1780023623846-486694746.webp","1"`;

console.log("Parsed:", parseCSV(csvStr));
