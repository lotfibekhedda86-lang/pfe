
const publication = document.getElementById('pub');
const orders = document.getElementById('ord');

function show() {
    orders.classList.remove('hidden');
    publication.classList.add('hidden');

}

function showpub() {
    orders.classList.add('hidden');
    publication.classList.remove('hidden');

}



function closeit(id) {

    document.getElementById(id).classList.toggle('hidden');

}
function openedit(id) {

    document.getElementById(id).classList.remove('hidden');

}



/* ----- Panel DB integration: stats, publications, orders (added) ----- */

// Get user from localStorage (synced by prepend.php)
function getPanelUser() {
    try { return JSON.parse(localStorage.getItem('user')); } catch(e) { return null; }
}

// Load dashboard stats
function loadPanelStats() {
    var user = getPanelUser();
    if (!user || !user.id) return;
    fetch('get_user_stats.php')
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (!data || data.error) return;
        var cards = document.querySelectorAll('.grid-cols-4 .text-2xl');
        if (cards.length >= 1) cards[0].textContent = data.publications;
        if (cards.length >= 2) cards[1].textContent = data.orders;
        if (cards.length >= 3) cards[2].textContent = data.avg_rating > 0 ? data.avg_rating + ' ★' : 'No rating';
        var statusEl = document.querySelector('.grid-cols-4 .text-amber-500');
        if (statusEl) statusEl.textContent = data.orders + ' order(s)';
        var reviewEl = document.querySelector('.grid-cols-4 .text-gray-400.text-\\[11px\\]');
        if (reviewEl) reviewEl.textContent = data.review_count + ' review(s)';
    })
    .catch(function(e) { console.error('Stats error:', e); });
}

// Load user publications
function loadPanelPublications() {
    var user = getPanelUser();
    if (!user || !user.id) return;
    fetch('get_user_publications.php')
    .then(function(r) { return r.json(); })
    .then(function(products) {
        if (!products || products.error) return;
        var container = document.getElementById('pub');
        if (!container) return;
        container.innerHTML = '';
        products.forEach(function(p) {
            var statusClass = p.etat === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700';
            var statusText = p.etat === 'active' ? 'Active' : 'Pending';
            var div = document.createElement('div');
            div.className = 'bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-agri-600/10 hover:shadow-md transition-shadow';
            div.innerHTML = '<div class="w-11 h-11 rounded-full bg-agri-50 flex items-center justify-center text-2xl flex-shrink-0"><img src="' + (p.image || 'img/default.jpg') + '" class="w-full h-full rounded-full object-cover" alt=""></div>' +
                '<div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap">' +
                '<span class="text-sm font-semibold text-gray-900">' + p.product_name + '</span>' +
                '<span class="' + statusClass + ' text-[10px] font-bold px-2 py-0.5 rounded-full">' + statusText + '</span></div>' +
                '<p class="text-xs text-gray-400 mt-0.5">' + (p.category || '') + '</p>' +
                '<p class="text-xs font-semibold text-green-700 mt-1">' + Number(p.price).toLocaleString() + ' DA</p></div>' +
                '<div class="flex gap-2 flex-shrink-0">' +
                '<button onclick="editProduct(' + p.id + ')" class="border border-green-300 text-gray-800 bg-slate-200 hover:bg-gray-400 hover:border-transparent text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"> Edit</button>' +
                '<button onclick="deleteProduct(' + p.id + ')" class="border border-red-300 text-red-400 hover:bg-red-50 text-sm px-2.5 py-1.5 rounded-lg transition-all"><i class="fa-regular fa-trash-can"></i></button></div>';
            container.appendChild(div);
        });
    })
    .catch(function(e) { console.error('Publications error:', e); });
}

// Load user orders
function loadPanelOrders() {
    var user = getPanelUser();
    if (!user || !user.id) return;
    fetch('get_user_orders.php')
    .then(function(r) { return r.json(); })
    .then(function(orders) {
        if (!orders || orders.error) return;
        var tbody = document.querySelector('#ord table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        var countEl = document.querySelector('#ord .bg-green-500');
        if (countEl) countEl.textContent = 'All (' + orders.length + ')';
        orders.forEach(function(o) {
            var statusClass = o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                (o.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                (o.status === 'canceled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'));
            var tr = document.createElement('tr');
            tr.className = 'hover:bg-green-50 transition-colors';
            tr.innerHTML = '<td class="px-5 py-4 text-gray-400 text-[11px] font-mono">#' + o.id + '</td>' +
                '<td class="px-5 py-4"><div class="flex items-center gap-2">' +
                '<span class="text-lg"><img class="rounded-md w-10 h-10 object-cover" src="' + (o.image || 'img/default.jpg') + '" alt=""></span>' +
                '<div><p class="font-semibold text-gray-800 text-xs">' + (o.products || 'N/A') + '</p>' +
                '<p class="text-[10px] text-gray-400">' + (o.category || '') + '</p></div></div></td>' +
                '<td class="px-5 py-4 text-gray-600 text-xs font-medium">' + (o.counterpart || o.buyer) + '</td>' +
                '<td class="px-5 py-4 text-gray-700 text-xs">' + o.quantity + '</td>' +
                '<td class="px-5 py-4 font-bold text-black text-xs">' + Number(o.total).toLocaleString() + ' DA</td>' +
                '<td class="px-5 py-4 text-gray-400 text-xs">' + (o.date || '') + '</td>' +
                '<td class="px-5 py-4"><span class="' + statusClass + ' text-[10px] font-bold px-2.5 py-1 rounded-full">' + o.status + '</span></td>' +
                '<td class="px-5 py-4"><div class="flex gap-1.5">' +
                '<button onclick="viewOrder(' + o.id + ')" class="border border-green-600 text-green-700 hover:bg-green-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all">see</button>' +
                '<button onclick="openEditOrder(' + o.id + ')" class="edit-btn border border-gray-200 text-black hover:bg-gray-200 text-[11px] px-2.5 py-1 rounded-lg transition-all"> edit ✏️</button></div></td>';
            tbody.appendChild(tr);
        });
    })
    .catch(function(e) { console.error('Orders error:', e); });
}

// Override showpub to reload publications when tab is opened
var _origShowpub = window.showpub;
window.showpub = function() {
    if (_origShowpub) _origShowpub();
    loadPanelPublications();
};

// Override show to reload orders when tab is opened
var _origShow = window.show;
window.show = function() {
    if (_origShow) _origShow();
    loadPanelOrders();
};

// Click logo -> main.html
document.addEventListener('DOMContentLoaded', function() {
    var ps = document.querySelectorAll('p');
    for (var i = 0; i < ps.length; i++) {
        if (ps[i].textContent.trim() === 'AGriTrade') {
            ps[i].parentNode.addEventListener('click', function() { window.location.href = 'main.html'; });
            break;
        }
    }

    // Navigate to anounce.html on "New Publication" click
    var btns = document.querySelectorAll('.bg-green-600');
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].textContent.indexOf('New Publication') !== -1) {
            btns[i].addEventListener('click', function() { window.location.href = 'anounce.html'; });
            break;
        }
    }
    loadPanelStats();
    loadPanelPublications();
    loadPanelOrders();
});

// Track current editing product ID
var editingProductId = null;

// Open edit modal with product data
function editProduct(id) {
    editingProductId = id;
    fetch('get_product_by_id.php?id=' + id)
    .then(function(r) { return r.json(); })
    .then(function(p) {
        if (!p || p.error) { alert('Product not found'); return; }
        document.getElementById('e-name').value = p.product_name || '';
        document.getElementById('e-price').value = p.price || '';
        document.getElementById('e-stock').value = p.quantity || 1;
        var catSelect = document.getElementById('e-cat');
        var catMap = { 'Fruits and vegetables': 0, 'Fruits & vegetables': 0, 'Seeds': 1, 'Equipements': 2, 'Equipment': 2, 'Grains': 3, 'Grains and cereals': 3, 'Livestock': 4, 'livesock': 4, 'Honey and natural products': 5, 'honey & Natural products': 5 };
        var idx = catMap[p.category] !== undefined ? catMap[p.category] : 0;
        if (catSelect && catSelect.options[idx]) catSelect.selectedIndex = idx;
        if (document.getElementById('edit').classList) document.getElementById('edit').classList.remove('hidden');
    })
    .catch(function(e) { console.error('Edit error:', e); });
}

// Save product from edit modal
function saveProduct(btn) {
    if (!editingProductId) { alert('No product selected'); return; }
    var formData = new FormData();
    formData.append('id', editingProductId);
    formData.append('name', document.getElementById('e-name').value);
    formData.append('category', document.getElementById('e-cat').value);
    formData.append('price', document.getElementById('e-price').value);
    var imgInput = document.getElementById('img-input');
    if (imgInput && imgInput.files && imgInput.files[0]) {
        formData.append('image', imgInput.files[0]);
    }
    btn.disabled = true;
    btn.textContent = 'Saving...';
    fetch('update_product.php', { method: 'POST', body: formData })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.success) {
            alert('Product updated');
            closeit('edit');
            loadPanelPublications();
        } else { alert('Error: ' + (data.error || 'Failed')); }
    })
    .catch(function(e) { alert('Save error: ' + e.message); })
    .finally(function() { btn.disabled = false; btn.textContent = 'Save'; });
}

// Delete product
function deleteProduct(id) {
    if (!confirm('Delete this product permanently?')) return;
    var user = getPanelUser();
    if (!user || !user.id) { alert('Please login'); return; }
    // Use admin_delete_product.php - works for any logged-in user
    fetch('delete_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id=' + id
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.success) {
            alert('Product deleted');
            loadPanelPublications();
            loadPanelStats();
        } else { alert('Error: ' + (data.error || 'Failed')); }
    })
    .catch(function(e) { console.error('Delete error:', e); });
}

// Open order edit modal with data
function openEditOrder(id) {
    var modal = document.getElementById('editorder');
    // Store order id on modal for cancel button
    modal.dataset.orderId = id;
    fetch('get_order_by_id.php?id=' + id)
    .then(function(r) { return r.json(); })
    .then(function(o) {
        if (!o || o.error) { alert('Order not found'); return; }
        modal.querySelector('.mono.text-xs') && (modal.querySelector('.mono.text-xs').textContent = '#' + o.id);
        var badge = modal.querySelector('.bg-blue-50.text-blue-600');
        if (badge) badge.textContent = o.status;
        var inputs = modal.querySelectorAll('input');
        if (inputs.length > 0) inputs[0].value = o.products || '';
        var qtyInput = document.getElementById('qty');
        if (qtyInput) qtyInput.value = o.quantities ? o.quantities.split('||')[0] : 1;
        var methods = modal.querySelectorAll('.method-card');
        if (methods.length >= 2) {
            methods.forEach(function(m) { m.className = m.className.replace(/border-green-500 bg-green-50/g, 'border-gray-200'); var r = m.querySelector('.radio'); if (r) r.className = r.className.replace('border-green-500 bg-green-500', 'border-gray-300'); });
            var idx = o.delivery === 'Home Delivery' ? 0 : 1;
            methods[idx].className = methods[idx].className.replace('border-gray-200', 'border-green-500 bg-green-50');
            var radio = methods[idx].querySelector('.radio');
            if (radio) radio.className = radio.className.replace('border-gray-300', 'border-green-500 bg-green-500');
        }
        modal.classList.remove('hidden');
    })
    .catch(function(e) { console.error('Load order error:', e); alert('Failed to load order'); });
}

// Quantity +/- buttons for edit order modal
function changeQty(delta) {
    var qty = document.getElementById('qty');
    if (!qty) return;
    var v = parseInt(qty.value) || 1;
    v += delta;
    if (v < 1) v = 1;
    if (v > 50) v = 50;
    qty.value = v;
}

/* ----- Cancel order handler (added) ----- */
document.addEventListener('DOMContentLoaded', function() {
    var cancelBtn = document.querySelector('#editorder .bg-red-50 button');
    if (cancelBtn) cancelBtn.addEventListener('click', function() {
        var modal = document.getElementById('editorder');
        var id = modal ? modal.dataset.orderId : null;
        if (!id) { alert('No order selected'); return; }
        if (!confirm('Cancel order #' + id + '? This cannot be undone.')) return;
        fetch('cancel_order.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'id=' + id
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                alert('Order #' + id + ' canceled');
                closeit('editorder');
                loadPanelOrders();
            } else { alert('Error: ' + (data.error || 'Failed')); }
        })
        .catch(function(e) { alert('Cancel error: ' + e.message); });
    });
});

// View order details
function viewOrder(id) {
    alert('Order #' + id + ' details - coming soon');
}