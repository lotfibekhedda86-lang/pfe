/* Shared app functions - cart, reviews, related products, utilities */

/* ---------- Cart ---------- */
function loadCart() {
    fetch('get_cart.php')
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data && data.items) {
            renderCart(data);
        }
    })
    .catch(function(e) { console.error('Cart load error:', e); });
}

function renderCart(data) {
    var container = document.querySelector('[id^="utilisateur"]');
    if (!container) return;
    var html = '<div class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">';
    data.items.forEach(function(item) {
        html += '<div class="flex items-center gap-3 p-3 rounded-xl border border-green-100 bg-green-50 relative" data-id="' + item.id_pp + '">';
        html += '<img class="w-16 h-16 rounded-lg object-cover border border-green-200" src="' + (item.image || 'img/default.jpg') + '" alt="">';
        html += '<div class="flex-1">';
        html += '<p class="text-sm font-semibold text-gray-800">' + item.product_name + '</p>';
        html += '<p class="text-xs text-gray-400 mt-0.5">x' + item.quantity + '</p>';
        html += '<p class="text-sm font-bold text-green-600 mt-1">' + Number(item.price).toLocaleString() + ' DA</p>';
        html += '</div>';
        html += '<button onclick="removeFromCart(' + item.id_pp + ')" class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"><i class="fa-solid fa-trash text-xs"></i></button>';
        html += '</div>';
    });
    html += '</div>';
    html += '<div class="border-t border-gray-100 px-5 py-4 flex flex-col gap-3">';
    html += '<div class="flex items-center justify-between"><span class="text-sm font-semibold text-gray-700">Total</span><span class="text-lg font-bold text-green-600">' + Number(data.total).toLocaleString() + ' DA</span></div>';
    container.innerHTML = html;
    var itemCount = document.getElementById('item count');
    if (itemCount) itemCount.textContent = data.count + ' item(s)';
}

function removeFromCart(id_pp) {
    fetch('remove_from_cart_process.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id_pp=' + id_pp
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.success) loadCart();
    })
    .catch(function(e) { console.error('Remove error:', e); });
}

/* ---------- Reviews ---------- */
function loadReviews(productId) {
    fetch('get_reviews.php?id=' + productId)
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (!data || data.error) return;
        var container = document.querySelector('section.max-w-5xl.mx-auto.px-8.py-14');
        if (!container) return;
        var reviewGrid = container.querySelector('.gap-10');
        if (!reviewGrid) return;
        var leftCol = reviewGrid.querySelector('.space-y-6');
        if (!leftCol) return;
        leftCol.innerHTML = '';
        if (data.reviews.length === 0) {
            leftCol.innerHTML = '<p class="text-sm text-gray-400">No reviews yet. Be the first!</p>';
        } else {
            data.reviews.forEach(function(r) {
                var stars = '';
                for (var i = 1; i <= 5; i++) { stars += i <= r.note ? '<span class="text-amber-300">★</span>' : '<span class="text-gray-300">★</span>'; }
                leftCol.innerHTML += '<div class="border-b border-gray-100 pb-6"><div class="flex items-center justify-between mb-2"><div class="flex items-center gap-2"><span class="text-sm font-medium">' + (r.nom_avis || r.user_name || r.username_user || 'Anonymous') + '</span></div><span class="text-xs">' + stars + '</span></div><p class="text-sm text-gray-500 leading-relaxed">' + (r.commentaire || '') + '</p></div>';
            });
        }
        var h2 = container.querySelector('h2');
        if (h2) {
            var sp = h2.querySelector('span');
            if (sp) sp.textContent = data.count + ' reviews (' + data.average + ' avg)';
        }
    })
    .catch(function(e) { console.error('Reviews load error:', e); });
}

function setupStarRating() {
    var buttons = document.querySelectorAll('.rating');
    window.__selectedRating = 0;
    buttons.forEach(function(btn, idx) {
        btn.classList.add('text-gray-300');
        btn.addEventListener('click', function() {
            window.__selectedRating = idx + 1;
            buttons.forEach(function(b, i) {
                b.classList.toggle('text-amber-400', i < (idx + 1));
                b.classList.toggle('text-gray-300', i >= (idx + 1));
            });
        });
    });
}

function setupReviewSubmit(productId) {
    var btn = document.getElementById('btn');
    if (!btn) return;
    btn.onclick = null;
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var rating = window.__selectedRating || 0;
        var comment = document.getElementById('txt') ? document.getElementById('txt').value : '';
        var name = document.getElementById('in') ? document.getElementById('in').value.trim() : '';
        if (!rating || !comment) { alert('Please select a rating and write a comment.'); return; }
        var formData = new FormData();
        formData.append('product_id', productId);
        formData.append('rating', rating);
        formData.append('comment', comment);
        if (name) formData.append('name', name);
        fetch('submit_review.php', {
            method: 'POST',
            body: formData
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                alert('Review submitted!');
                loadReviews(productId);
                document.getElementById('txt').value = '';
                window.__selectedRating = 0;
                document.querySelectorAll('.rating').forEach(function(b) { b.classList.add('text-gray-300'); b.classList.remove('text-amber-400'); });
            } else { alert('Error: ' + (data.error || 'Please login first.')); }
        })
        .catch(function(e) { console.error('Review submit error:', e); });
    });
}

/* ---------- Related Products ---------- */
function loadRelatedProducts(category, productId) {
    fetch('get_related_products.php?id=' + productId)
    .then(function(r) { return r.json(); })
    .then(function(products) {
        if (!products || products.length === 0) return;
        var container = document.querySelector('#related .grid');
        if (!container) return;
        container.innerHTML = '';
        products.forEach(function(p) {
            container.innerHTML += '<div class="group cursor-pointer" onclick="window.location=\'product_page.html?id=' + p.id + '\'"><div class="bg-gray-100 rounded-xl overflow-hidden aspect-square mb-3"><img src="' + (p.image || 'img/default.jpg') + '" class="w-full h-full object-cover"></div><p class="text-sm font-medium">' + p.product_name + '</p><p class="text-sm text-gray-400 mt-0.5">' + Number(p.price).toLocaleString() + ' DA</p></div>';
        });
    })
    .catch(function(e) { console.error('Related products error:', e); });
}

/* ---------- Utilities ---------- */
function swap(idx, el) {
    var mainImg = document.getElementById('main-img');
    if (mainImg && el.src) mainImg.src = el.src;
    document.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('border-2', 'border-green-500'); });
    el.classList.add('border-2', 'border-green-500');
}
