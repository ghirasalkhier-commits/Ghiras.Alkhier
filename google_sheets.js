const SHEET_ID = '1Pe2CutV78Hd6ogCB8kZlEjEgqK5Tn1bRoJZw_PYqc3k';

function fetchFromSheet(sheetName) {
    return new Promise((resolve) => {
        const callbackName = 'jsonp_callback_' + Math.round(1000000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            try { document.body.removeChild(script); } catch(e) {}
            
            if (!data || !data.table || !data.table.rows) {
                console.error(`Empty or invalid data for sheet: ${sheetName}`);
                return resolve([]);
            }

            const rows = data.table.rows;
            const cols = data.table.cols.map(c => c ? c.label : '');
            
            const result = rows.map(r => {
                const obj = {};
                cols.forEach((col, i) => {
                    if (col) {
                        obj[col] = r.c[i] ? r.c[i].v : '';
                    }
                });
                return obj;
            });
            resolve(result);
        };

        const script = document.createElement('script');
        script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json;responseHandler=${callbackName}&sheet=${sheetName}`;
        script.onerror = () => {
            console.error(`Failed to fetch JSONP for sheet: ${sheetName}`);
            try { document.body.removeChild(script); } catch(e) {}
            resolve([]); // Return empty array on error so UI doesn't crash completely
        };
        document.body.appendChild(script);
    });
}

// Global data objects
window.googleSheetsData = {
    getProducts: async () => await fetchFromSheet('products'),
    getCategories: async () => await fetchFromSheet('categories')
};
