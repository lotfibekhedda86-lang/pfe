function Opncmt() {

    document.getElementById('Cmt').classList.remove('hidden');

}
function closecmt() {

    document.getElementById('Cmt').classList.add('hidden')
}

const a = document.getElementById('listings');
const b = document.getElementById('User');
const c = document.getElementById('order');
const d = document.getElementById('catego');



function openingL() {

    a.classList.remove('hidden');

    b.classList.add('hidden');
    c.classList.add('hidden');
    d.classList.add('hidden');


}


function openingO() {

    c.classList.remove('hidden');

    b.classList.add('hidden');
    a.classList.add('hidden');
    d.classList.add('hidden');

}

function openingC() {

    d.classList.remove('hidden');

    b.classList.add('hidden');
    a.classList.add('hidden');
    c.classList.add('hidden');


}
function openingU() {

    b.classList.remove('hidden');

    c.classList.add('hidden');
    a.classList.add('hidden');
    d.classList.add('hidden');

}

function logclose() {

    document.getElementById('logout').classList.add('hidden');
}


function logOpen() {

    document.getElementById('logout').classList.remove('hidden');
}

// Logout button handler
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('#logout .bg-red-500');
    if (btn) btn.addEventListener('click', function() { window.location.href = 'logout.php'; });
});

/* ----- Admin DB integration: load pending requests, approve/refuse, all listings, orders (added) ----- */

// Override openingL to reload data when Listings tab is opened
var _origOpeningL = window.openingL;
window.openingL = function() {
    if (_origOpeningL) _origOpeningL();
    loadPendingRequests();
    loadAllListings();
};

// Override openingO to reload orders when Orders tab is opened
var _origOpeningO = window.openingO;
window.openingO = function() {
    if (_origOpeningO) _origOpeningO();
    loadAdminOrders();
};

// Load pending product requests on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPendingRequests();
    loadAllListings();
    loadAdminOrders();
});

// Load all orders into the admin orders table
function loadAdminOrders() {
    fetch('admin_get_orders.php')
    .then(function(r) { return r.json(); })
    .then(function(orders) {
        if (!orders || orders.error) return;
        var tbody = document.querySelector('#order table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        var countSpan = document.querySelector('#order .bg-yellow-100');
        if (countSpan) countSpan.textContent = orders.length + ' orders';
        orders.forEach(function(o) {
            var statusClass = o.status === 'delivered' ? 'bg-green-50 text-green-700' :
                (o.status === 'processing' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700');
            var tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            tr.innerHTML = '<td class="px-4 py-3 font-mono text-[10px] text-gray-400">#' + o.id + '</td>' +
                '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + o.buyer + '</td>' +
                '<td class="px-4 py-3 text-xs text-gray-600">' + o.seller + '</td>' +
                '<td class="px-4 py-3 text-xs text-gray-600 max-w-[120px] truncate" title="' + o.products + '">' + o.products + '</td>' +
                '<td class="px-4 py-3"><span class="bg-blue-50 text-blue-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + o.payment + '</span></td>' +
                '<td class="px-4 py-3"><span class="bg-green-50 text-green-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + o.delivery + '</span></td>' +
                '<td class="px-4 py-3 text-xs font-medium text-green-600">' + Number(o.amount).toLocaleString() + ' DA</td>' +
                '<td class="px-4 py-3"><span class="' + statusClass + ' text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + o.status + '</span></td>' +
                '<td class="px-4 py-3"><button class="flex items-center gap-1 text-xs text-red-600 border border-red-100 rounded-lg px-2.5 py-1 hover:bg-red-50 transition-colors"><i class="fa-solid fa-trash text-[9px]"></i> Remove</button></td>';
            tbody.appendChild(tr);
        });
    })
    .catch(function(e) { console.error('Load orders error:', e); });
}

// Load pending products into the listing requests section
function loadPendingRequests() {
    fetch('admin_get_pending.php')
    .then(function(r) { return r.json(); })
    .then(function(products) {
        if (!products || products.error) return;
        var container = document.querySelector('#listings .space-y-2');
        if (!container) return;
        container.innerHTML = '';
        products.forEach(function(p) {
            var div = document.createElement('div');
            div.className = 'flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3';
            div.innerHTML = '<div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">' +
                '<img src="' + (p.image || 'img/default.jpg') + '" class="w-full h-full object-cover rounded-lg" alt=""></div>' +
                '<div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900">' + p.product_name + '</p>' +
                '<p class="text-xs text-gray-400 mt-0.5">by <span class="text-gray-500">' + (p.seller_name || p.seller_username) + '</span> ' + (p.date || '') + '</p></div>' +
                '<div class="flex gap-2 flex-shrink-0">' +
                '<button onclick="viewProduct(' + p.id + ')" class="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><i class="fa-solid fa-eye text-[10px]"></i> View</button>' +
                '<button onclick="approveProduct(' + p.id + ', this)" class="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"><i class="fa-solid fa-check text-[10px]"></i> Accept</button>' +
                '<button onclick="refuseProduct(' + p.id + ', this)" class="flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"><i class="fa-solid fa-xmark text-[10px]"></i> Refuse</button></div>';
            container.appendChild(div);
        });
        var countSpan = document.querySelector('#listings .bg-yellow-100');
        if (countSpan) countSpan.textContent = products.length + ' pending';
    })
    .catch(function(e) { console.error('Load pending error:', e); });
}

// Show product details in a modal before approval
function viewProduct(id) {
    fetch('get_product_by_id.php?id=' + id)
    .then(function(r) { return r.json(); })
    .then(function(p) {
        if (!p || p.error) { alert('Product not found'); return; }
        // Create modal overlay dynamically
        var overlay = document.createElement('div');
        overlay.id = 'productViewModal';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999';
        overlay.innerHTML = '<div style="background:white;border-radius:16px;padding:24px;max-width:450px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative">' +
            '<button onclick="this.closest(\'#productViewModal\').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:20px;cursor:pointer;color:#999">&times;</button>' +
            '<img src="' + (p.image || 'img/default.jpg') + '" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:16px" alt="">' +
            '<h2 style="font-size:18px;font-weight:700;color:#1f2937;margin-bottom:4px">' + p.product_name + '</h2>' +
            '<p style="font-size:14px;color:#059669;font-weight:600;margin-bottom:12px">' + Number(p.price).toLocaleString() + ' DA</p>' +
            '<p style="font-size:13px;color:#6b7280;margin-bottom:8px"><strong>Seller:</strong> ' + (p.seller_name || 'N/A') + '</p>' +
            '<p style="font-size:13px;color:#6b7280;margin-bottom:8px"><strong>Category:</strong> ' + (p.category || 'N/A') + '</p>' +
            '<p style="font-size:13px;color:#6b7280;margin-bottom:16px"><strong>Description:</strong><br>' + (p.description || 'No description') + '</p>' +
            '<div style="display:flex;gap:8px">' +
            '<button onclick="approveProduct(' + p.id + ', this);document.getElementById(\'productViewModal\').remove()" style="flex:1;padding:10px;background:#059669;color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer">Accept</button>' +
            '<button onclick="refuseProduct(' + p.id + ', this);document.getElementById(\'productViewModal\').remove()" style="flex:1;padding:10px;background:#dc2626;color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer">Refuse</button></div></div>';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
    })
    .catch(function(e) { console.error('View product error:', e); });
}

// Approve a product (etat = 'active')
function approveProduct(id, btn) {
    fetch('admin_approve_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id=' + id
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.success) {
            var item = btn.closest('.flex.items-center.gap-3');
            if (item) item.style.display = 'none';
            loadPendingRequests();
            loadAllListings();
        } else { alert('Error: ' + (data.error || 'Failed to approve')); }
    })
    .catch(function(e) { console.error('Approve error:', e); });
}

// Refuse/delete a product
function refuseProduct(id, btn) {
    if (!confirm('Delete this product permanently?')) return;
    fetch('admin_delete_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id=' + id
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.success) {
            var item = btn.closest('.flex.items-center.gap-3');
            if (item) item.style.display = 'none';
            loadPendingRequests();
            loadAllListings();
        } else { alert('Error: ' + (data.error || 'Failed to delete')); }
    })
    .catch(function(e) { console.error('Refuse error:', e); });
}

// Load all products into the listings table
function loadAllListings() {
    fetch('admin_get_all_listings.php')
    .then(function(r) { return r.json(); })
    .then(function(products) {
        if (!products || products.error) return;
        var tbody = document.querySelector('#listings table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        products.forEach(function(p) {
            var statusClass = p.etat === 'active' ? 'bg-green-50 text-green-700' : (p.etat === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600');
            var tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            tr.innerHTML = '<td class="px-4 py-3 font-mono text-[10px] text-gray-400">' + p.id + '</td>' +
                '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + p.product_name + '</td>' +
                '<td class="px-4 py-3 text-xs text-gray-400">' + (p.date || '') + '</td>' +
                '<td class="px-4 py-3 text-xs text-gray-600">' + (p.seller_name || p.seller_username) + '</td>' +
                '<td class="px-4 py-3"><span class="bg-blue-50 text-blue-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + (p.category || '') + '</span></td>' +
                '<td class="px-4 py-3 text-xs font-medium text-green-600">' + Number(p.price).toLocaleString() + ' DA</td>' +
                '<td class="px-4 py-3"><span class="' + statusClass + ' text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + p.etat + '</span></td>' +
                '<td class="px-4 py-3 text-xs font-medium">0</td>' +
                '<td class="px-4 py-3"><div class="flex gap-2">' +
                '<button onclick="viewProduct(' + p.id + ')" class="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded-lg px-2.5 py-1 hover:bg-blue-50 transition-colors"><i class="fa-solid fa-eye text-[9px]"></i> View</button>' +
                '<button onclick="refuseProduct(' + p.id + ', this)" class="flex items-center gap-1 text-xs text-red-600 border border-red-100 rounded-lg px-2.5 py-1 hover:bg-red-50 transition-colors"><i class="fa-solid fa-trash text-[9px]"></i> Remove</button></div></td>';
            tbody.appendChild(tr);
        });
    })
    .catch(function(e) { console.error('Load listings error:', e); });
}

/* ----- Admin category CRUD (added) ----- */
function loadCategories() {
    fetch('admin_get_categories.php')
    .then(function(r) { return r.json(); })
    .then(function(cats) {
        var tbody = document.querySelector('#catego tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (!cats || cats.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" class="px-4 py-6 text-center text-xs text-gray-400">No categories yet</td></tr>';
            return;
        }
        cats.forEach(function(c) {
            var tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            tr.innerHTML = '<td class="px-4 py-3 font-mono text-[10px] text-gray-400">' + c.nom_ctg + '</td>' +
                '<td class="px-4 py-3 absolute"><div class="flex gap-2">' +
                '<button class="edit-cat flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-100 transition-colors" data-id="' + c.id_ctg + '">Edit name</button>' +
                '<button class="del-cat flex items-center gap-1 text-xs text-red-600 border border-red-100 rounded-lg px-2.5 py-1 hover:bg-red-50 transition-colors" data-id="' + c.id_ctg + '"><i class="fa-solid fa-trash text-[9px]"></i> Remove</button></div></td>';
            tbody.appendChild(tr);
        });
        var countSpan = document.querySelector('#catego .bg-yellow-100, #catego .text-base.font-semibold');
        if (countSpan) countSpan.textContent = 'Categories (' + cats.length + ')';
    })
    .catch(function(e) { console.error('Load categories error:', e); });
}

// Override openingC to refresh categories when tab opens
var _origOpeningC = window.openingC;
window.openingC = function() {
    if (_origOpeningC) _origOpeningC();
    loadCategories();
};

// "+ New Category" button
document.addEventListener('DOMContentLoaded', function() {
    var newBtn = document.querySelector('#catego .bg-green-300');
    if (newBtn) {
        newBtn.addEventListener('click', function() {
            var name = prompt('Enter new category name:');
            if (!name || !name.trim()) return;
            var fd = new FormData();
            fd.append('name', name.trim());
            fetch('admin_add_category.php', { method: 'POST', body: fd })
            .then(function(r) { return r.json(); })
            .then(function(d) {
                if (d.success) loadCategories();
                else alert('Error: ' + (d.error || 'Unknown'));
            })
            .catch(function(e) { console.error('Add category error:', e); });
        });
    }
    // Edit / Delete via event delegation on tbody
    var tbody = document.querySelector('#catego tbody');
    if (tbody) {
        tbody.addEventListener('click', function(e) {
            var btn = e.target.closest('.edit-cat, .del-cat');
            if (!btn) return;
            var id = btn.getAttribute('data-id');
            if (btn.classList.contains('edit-cat')) {
                var name = prompt('Edit category name:');
                if (!name || !name.trim()) return;
                var fd = new FormData();
                fd.append('id', id);
                fd.append('name', name.trim());
                fetch('admin_edit_category.php', { method: 'POST', body: fd })
                .then(function(r) { return r.json(); })
                .then(function(d) {
                    if (d.success) loadCategories();
                    else alert('Error: ' + (d.error || 'Unknown'));
                })
                .catch(function(e) { console.error('Edit category error:', e); });
            } else if (btn.classList.contains('del-cat')) {
                if (!confirm('Delete this category? Products in this category will lose their category association.')) return;
                var fd = new FormData();
                fd.append('id', id);
                fetch('admin_delete_category.php', { method: 'POST', body: fd })
                .then(function(r) { return r.json(); })
                .then(function(d) {
                    if (d.success) loadCategories();
                    else alert('Error: ' + (d.error || 'Unknown'));
                })
                .catch(function(e) { console.error('Delete category error:', e); });
            }
        });
    }
});

/* ----- Admin users (added) ----- */
function loadUsers() {
    fetch('admin_get_users.php')
    .then(function(r) { return r.json(); })
    .then(function(users) {
        var tbody = document.querySelector('#User tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (!users || users.error || users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-xs text-gray-400">No users found</td></tr>';
            return;
        }
        users.forEach(function(u) {
            var tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            var statusClass = u.role === 'admin' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700';
            tr.innerHTML = '<td class="px-4 py-3 font-mono text-[10px] text-gray-400">' + u.username_user + '</td>' +
                '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + (u.email || '—') + '</td>' +
                '<td class="px-4 py-3 text-xs text-gray-400">' + (u.listings || 0) + '</td>' +
                '<td class="px-4 py-3"><span class="' + statusClass + ' text-[11px] font-medium px-2.5 py-0.5 rounded-full">' + u.role + '</span></td>' +
                '<td class="px-4 py-3"><div class="flex gap-2">' +
                '<button class="view-user-listings flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-100 transition-colors" data-id="' + u.id_user + '">consult user\'s listings</button>' +
                '<button class="ban-user flex items-center gap-1 text-xs text-red-600 border border-red-100 rounded-lg px-2.5 py-1 hover:bg-red-50 transition-colors" data-id="' + u.id_user + '"><i class="fa-solid fa-trash text-[9px]"></i> Ban</button></div></td>';
            tbody.appendChild(tr);
        });
    })
    .catch(function(e) { console.error('Load users error:', e); });
}

// Override openingU to refresh users when tab opens
var _origOpeningU = window.openingU;
window.openingU = function() {
    if (_origOpeningU) _origOpeningU();
    loadUsers();
};

// Ban and view user listings via event delegation
document.addEventListener('DOMContentLoaded', function() {
    var tbody = document.querySelector('#User tbody');
    if (tbody) {
        tbody.addEventListener('click', function(e) {
            var btn = e.target.closest('.ban-user, .view-user-listings');
            if (!btn) return;
            var id = btn.getAttribute('data-id');
            if (btn.classList.contains('ban-user')) {
                if (!confirm('Ban this user? This will permanently delete the user and their products.')) return;
                var fd = new FormData();
                fd.append('id', id);
                fetch('admin_delete_user.php', { method: 'POST', body: fd })
                .then(function(r) { return r.json(); })
                .then(function(d) {
                    if (d.success) loadUsers();
                    else alert('Error: ' + (d.error || 'Failed'));
                })
                .catch(function(e) { console.error('Ban user error:', e); });
            } else if (btn.classList.contains('view-user-listings')) {
                window.location.href = 'panel.html?user_id=' + id;
            }
        });
    }
});

/* ----- Admin search & status filtering (added) ----- */
function setupTableFilter(sectionId, filterCol) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var input = section.querySelector('input[type="text"]');
    var select = section.querySelector('select');
    var tbody = section.querySelector('table tbody');
    if (!input || !select || !tbody) return;
    function filter() {
        var q = (input.value || '').toLowerCase().trim();
        var f = (select.options[select.selectedIndex].textContent || '').toLowerCase().trim();
        var rows = tbody.querySelectorAll('tr');
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i];
            if (!r.cells || r.cells.length < 2) { r.style.display = ''; continue; }
            if (q === '' && (f === 'all status' || f === 'all users' || f === 'all' || f === '')) {
                r.style.display = ''; continue;
            }
            var matchSearch = true, matchFilter = true;
            if (q !== '') {
                matchSearch = false;
                for (var c = 0; c < r.cells.length; c++) {
                    if ((r.cells[c].textContent || '').toLowerCase().indexOf(q) !== -1) { matchSearch = true; break; }
                }
            }
            if (f !== 'all status' && f !== 'all users' && f !== 'all' && f !== '') {
                var statusCell = r.cells[filterCol];
                if (statusCell) {
                    matchFilter = ((statusCell.textContent || '').toLowerCase().indexOf(f) !== -1);
                }
            }
            r.style.display = (matchSearch && matchFilter) ? '' : 'none';
        }
    }
    input.addEventListener('input', filter);
    select.addEventListener('change', filter);
}

document.addEventListener('DOMContentLoaded', function() {
    setupTableFilter('listings', 6);
    setupTableFilter('User', 3);
    setupTableFilter('order', 7);
});