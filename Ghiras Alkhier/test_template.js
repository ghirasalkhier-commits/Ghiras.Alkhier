const o = { id: 5, status: 'pending', total_price: 77, created_at: '2026-05-31 23:55:40' };
const items = '1x يبليب';
const data = {
  address: {
    building: "36",
    floor: "",
    details: "",
    latitude: 32.00058675,
    longitude: 35.892599000000004
  }
};
let statusClass = 'bg-orange-100 text-orange-700';
let statusText = 'Pending';
let date = o.created_at;

const html = `
                <div class="bg-white p-5 rounded-3xl shadow-soft border border-surface-dim space-y-3">
                    <div class="flex justify-between items-start border-b border-surface-dim pb-3">
                        <div>
                            <p class="text-xs text-text-muted font-medium mb-1">Order #${o.id}</p>
                            <p class="text-sm font-bold text-text">${date}</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${statusClass}">
                            ${statusText}
                        </span>
                    </div>
                    
                    <div class="py-2">
                        <p class="text-sm text-text leading-relaxed font-medium">${items}</p>
                    </div>
                    ${data.address ? `
                    <div class="py-2 border-t border-surface-dim">
                        <p class="text-xs text-text-muted mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">location_on</span> Delivery Address</p>
                        <p class="text-sm font-medium text-text">${data.address.label || 'Unnamed Address'}${data.address.building ? ` - Bldg ${data.address.building}` : ''}</p>
                    </div>
                    ` : `
                    <div class="py-2 border-t border-surface-dim">
                        <p class="text-xs text-text-muted mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">storefront</span> Store Pickup</p>
                    </div>
                    `}
                    
                    <div class="flex justify-between items-center pt-3 border-t border-surface-dim">
                        <span class="text-sm text-text-muted">Total Amount</span>
                        <p class="font-bold text-primary">JOD ${o.total_price.toFixed(2)}</p>
                    </div>
                </div>
                `;
console.log(html);
