// cart 
var cart = document.getElementById('cart');

function openCart() {

    cart.classList.add('active');

}

function closeCart() {
    cart.classList.remove('active');

}

// profile 
var prof = document.getElementById('prof');

function openProfile() {

    prof.classList.add('active');

}
function closeProfile() {
    prof.classList.remove('active');

}
// categorie scrool 
function goToCategory(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

}

// add to cartbutton  
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
        const id = this.dataset.id;

        fetch('cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'product_id=' + id
        })
            .then(res => res.json())
            .then(data => {
                this.classList.add('text-green-600');
                setTimeout(() => this.classList.remove('text-green-600'), 1500);
            });
    });
});


///geust, utilisateur ,admin 


function continueAsGuest() {
    const guestUser = {
        role: "guest",
        name: "Guest"
    };

    localStorage.setItem("user", JSON.stringify(guestUser));
    window.location.href = "main.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        if (user.role === "guest") {


            document.getElementById('navbardiv').innerHTML += '<p ><span class=" text-2xl text-gray-200"> Welcome,<span class="font-thin text-black"> Guest !</span>  </span> <br> <span class="text-sm  text-green-200 font-extralight absolute left-16 "> Give Your Produts an online Presence  </span> </p> ';


            document.getElementById('profile').innerHTML += `


 <div class="flex flex-col items-center text-center px-5 py-6">
    <div class="rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-3" style="width:64px;height:64px;">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
    <p class="text-sm font-medium text-gray-800">Browsing as Guest</p>
    <p class="text-xs text-gray-400 mt-1 leading-relaxed">Sign in to access your full profile.</p>
  </div>

  <div class="flex flex-col gap-2 px-5 ">
    <button onclick="window.location.href='login.html'"
     class="w-full py-2 text-sm font-medium rounded-lg bg-blue-50 border border-blue-400 text-blue-700 hover:bg-blue-100 transition-colors">Sign in</button>
    <button onclick="window.location.href='signup.html'" class="w-full py-1 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">Create an account</button>
  </div>
  
`;



            document.getElementById('cartguest').innerHTML += ` <span class="text-xs font-medium text-gray-400 uppercase tracking-widest pl-28">Guest mode</span>



`;
            document.getElementById('Checkout').innerHTML += `
  <div class="relative group w-72">
    <button disabled
      aria-disabled="true"
      aria-describedby="checkout-tip"
      class="w-full bg-slate-400 text-white text-sm 
             font-semibold py-3 rounded-xl flex items-center 
             justify-center gap-2 cursor-not-allowed opacity-60">
      <i class="fa-solid fa-bag-shopping"></i> Checkout
    </button>
    <span id="checkout-tip" role="tooltip"
      class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
             bg-gray-800 text-white text-xs px-3 py-1 rounded-md
             opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
      Please sign in to checkout
    </span>
  </div>
`


        }

        else {


            if (user.role === "client") {

                document.getElementById('navbardiv').innerHTML += `<p <span class=" text-2xl text-gray-200"> Welcome</span>,<span class= "font-thin text-black"> ${user.name}</span> </p>`;

                // Fetch real profile data
                var profileHtml = '<div class="p-6 flex flex-col items-center border-b border-gray-50">';
                profileHtml += '<div class="relative group">';
                profileHtml += '<img id="profile-avatar" src="img/default-avatar.png" alt="Avatar" class="w-20 h-20 rounded-full border-2 border-blue-500 p-1">';
                profileHtml += '<button id="btn-upload-avatar" class="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full text-xs shadow-lg hover:bg-blue-700"><i class="fa-solid fa-camera"></i></button>';
                profileHtml += '</div>';
                profileHtml += '<h2 id="profile-name" class="mt-3 font-bold text-gray-800 text-lg">' + user.name + '</h2>';
                profileHtml += '<p id="profile-phone" class="text-xs text-gray-500">Loading...</p>';
                profileHtml += '</div>';
                profileHtml += '<div class="flex justify-around p-3 bg-gray-50">';
                profileHtml += '<button id="btn-annonce" class="flex flex-col items-center text-blue-600 hover:text-blue-800"><i class="fa-solid fa-bullhorn text-xl"></i><span class="text-[10px] mt-1 font-bold">Annonce</span></button>';
                profileHtml += '<button id="btn-logout" class="flex flex-col items-center text-red-500 hover:text-red-700"><i class="fa-solid fa-right-from-bracket text-xl"></i><span class="text-[10px] mt-1 font-bold">logout</span></button>';
                profileHtml += '</div>';
                profileHtml += '<div class="p-4 border-b border-gray-50">';
                profileHtml += '<div class="flex items-center gap-2 mb-3 text-gray-700"><i class="fa-solid fa-gear text-sm"></i><span class="text-sm font-semibold"> My Settings :</span></div>';
                profileHtml += '<ul class="space-y-2 text-sm text-gray-600">';
                profileHtml += '<li id="btn-change-name" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition"><span>Change Name</span><i class="fa-solid fa-chevron-right text-[10px]"></i></li>';
                profileHtml += '<li id="btn-change-password" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition"><span>Change Password</span><i class="fa-solid fa-lock text-[10px]"></i></li>';
                profileHtml += '<li id="btn-change-email" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition"><span>Email & phone Number</span><i class="fa-solid fa-pen text-[10px]"></i></li>';
                profileHtml += '</ul></div>';

                document.getElementById('profile').innerHTML = profileHtml;

                // Load profile data
                fetch('get_user_profile.php')
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (!data || data.error) return;
                    var nameEl = document.getElementById('profile-name');
                    var phoneEl = document.getElementById('profile-phone');
                    var avatarEl = document.getElementById('profile-avatar');
                    if (nameEl) nameEl.textContent = data.nom || data.username_user || user.name;
                    if (phoneEl) phoneEl.textContent = data.tel_user ? '+213 ' + data.tel_user : 'No phone';
                    if (avatarEl && data.image_user) avatarEl.src = data.image_user + '?' + Date.now();
                })
                .catch(function(e) { console.error('Profile load error:', e); });

                // Attach button handlers
                setTimeout(function() {
                    // Annonce
                    var annonceBtn = document.getElementById('btn-annonce');
                    if (annonceBtn) annonceBtn.addEventListener('click', function() { window.location.href = 'anounce.html'; });

                    // Logout
                    var logoutBtn = document.getElementById('btn-logout');
                    if (logoutBtn) logoutBtn.addEventListener('click', function() { window.location.href = 'logout.php'; });

                    // Avatar upload
                    var avatarBtn = document.getElementById('btn-upload-avatar');
                    if (avatarBtn) avatarBtn.addEventListener('click', function() {
                        var input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = function() {
                            var file = input.files[0];
                            if (!file) return;
                            var fd = new FormData();
                            fd.append('avatar', file);
                            fetch('upload_avatar.php', { method: 'POST', body: fd })
                            .then(function(r) { return r.json(); })
                            .then(function(resp) {
                                if (resp.success) {
                                    document.getElementById('profile-avatar').src = resp.avatar + '?' + Date.now();
                                } else { alert('Upload error: ' + (resp.error || 'Failed')); }
                            })
                            .catch(function(e) { alert('Upload failed'); });
                        };
                        input.click();
                    });

                    // Change Name
                    var changeName = document.getElementById('btn-change-name');
                    if (changeName) changeName.addEventListener('click', function() {
                        var newName = prompt('Enter new name:', '');
                        if (!newName) return;
                        fetch('update_profile.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: 'field=nom&value=' + encodeURIComponent(newName)
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(resp) {
                            if (resp.success) {
                                document.getElementById('profile-name').textContent = newName;
                                alert('Name updated!');
                            } else { alert('Error: ' + (resp.error || 'Failed')); }
                        });
                    });

                    // Change Password
                    var changePw = document.getElementById('btn-change-password');
                    if (changePw) changePw.addEventListener('click', function() {
                        var newPw = prompt('Enter new password (min 6 chars):', '');
                        if (!newPw || newPw.length < 6) { alert('Password must be at least 6 characters'); return; }
                        fetch('update_profile.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: 'field=password&value=' + encodeURIComponent(newPw)
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(resp) {
                            if (resp.success) { alert('Password updated!'); }
                            else { alert('Error: ' + (resp.error || 'Failed')); }
                        });
                    });

                    // Email & phone
                    var changeContact = document.getElementById('btn-change-email');
                    if (changeContact) changeContact.addEventListener('click', function() {
                        var newEmail = prompt('Enter new email:', '');
                        if (!newEmail) return;
                        fetch('update_profile.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: 'field=e_mail_user&value=' + encodeURIComponent(newEmail)
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(resp) {
                            if (resp.success) {
                                var newPhone = prompt('Enter new phone:', '');
                                if (newPhone) {
                                    fetch('update_profile.php', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        body: 'field=tel_user&value=' + encodeURIComponent(newPhone)
                                    })
                                    .then(function(r2) { return r2.json(); })
                                    .then(function(resp2) {
                                        if (resp2.success) {
                                            document.getElementById('profile-phone').textContent = '+213 ' + newPhone;
                                            alert('Email & phone updated!');
                                        } else { alert('Error: ' + (resp2.error || 'Failed')); }
                                    });
                                }
                            } else { alert('Error: ' + (resp.error || 'Failed')); }
                        });
                    });
                }, 50);

                document.getElementById('utilisateur').innerHTML += `

  <div class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">

    <div class="flex items-center gap-3 p-3 rounded-xl border border-green-100 bg-green-50 relative">
      <img class="w-16 h-16 rounded-lg object-cover border border-green-200" src="img/6c344d208e0ba9fd6b4011f692d2518e.jpg" alt="">
      <div class="flex-1">
        <p class="text-sm font-semibold text-gray-800">Product Name Here</p>
        <p class="text-xs text-gray-400 mt-0.5">quantity</p>
        <p class="text-sm font-bold text-green-600 mt-1">price here DA</p>
      </div>
      <button class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
        <i class="fa-solid fa-trash text-xs"></i>
      </button>
    </div>

  </div>

  <div class="  border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
 
   
    <div class="flex items-center justify-between">
      <span class="text-sm font-semibold text-gray-700">Total</span>
      <span class="text-lg font-bold text-green-600">total price here</span>
    </div>
`;
                document.getElementById('Checkout').innerHTML += ` <button  onclick="opencheck('Check')"
    class=" w-72 bg-green-500 hover:bg-green-400 transition-all duration-100 ease-in-out text-white text-sm font-semibold py-3 rounded-xl  flex items-center justify-center gap-2">
      <i class="fa-solid fa-bag-shopping"></i> Checkout
    </button> `;

            }
            else {
                document.getElementById('navbardiv').innerHTML += `<p>Welcome, ${user.name}</p>`;
                if (user.role === 'admin') {
                    var cp = document.querySelector('a[href*="panel.html"]');
                    if (cp) cp.href = 'admin.html';
                }
            }
        }
    }
});

function closecheck(id) {
    document.getElementById(id).classList.add('hidden');
}

function opencheck(id) {
    document.getElementById(id).classList.remove('hidden');
}

// Fix trailing space in id="utilisateur " so getElementById('utilisateur') works
var utilDiv = document.querySelector('[id^="utilisateur"]');
if (utilDiv && utilDiv.id && utilDiv.id !== 'utilisateur') { utilDiv.id = 'utilisateur'; }

// Load products from database immediately (no dependency on app.js)
loadProductsFromDB();

/* ----- App.js loader and DB integration (added) ----- */
var appScript = document.createElement('script');
appScript.src = 'app.js';
appScript.onload = function() {
    var origOpen = window.openCart;
    window.openCart = function() {
        if (typeof loadCart === 'function') loadCart();
        if (typeof cart !== 'undefined') cart.classList.add('active');
    };
    fetch('get_session.php')
    .then(function(r) { return r.json(); })
    .then(function(session) {
        if (session) {
            localStorage.setItem('user', JSON.stringify({ id: session.id, name: session.name, username: session.username, role: session.role }));
            var nav = document.getElementById('navbardiv');
            if (nav) nav.innerHTML = '<p class="text-sm text-gray-600">Welcome, <strong>' + session.name + '</strong></p>';
        }
    })
    .catch(function(e) { console.log('Session check error:', e); });
    // (loadProductsFromDB moved before appScript - runs synchronously)
};
document.body.appendChild(appScript);

/* ----- Checkout: Submit order (added) ----- */
document.addEventListener('DOMContentLoaded', function() {
    var confirmBtn = document.querySelector('#Check .bg-green-600');
    if (!confirmBtn) return;
    confirmBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var nameInput = document.querySelector('#Check input[type="text"]');
        var addressInput = document.querySelector('#Check input[placeholder*="Adresse"]');
        var phoneInput = document.querySelector('#Check input[type="tel"]');
        var deliveryRadios = document.querySelectorAll('#Check input[name="delivery"]');
        var paymentRadios = document.querySelectorAll('#Check input[name="payment"]');
        // Validate
        if (!nameInput || !nameInput.value.trim()) { alert('Please enter your full name.'); return; }
        if (!addressInput || !addressInput.value.trim()) { alert('Please enter your address.'); return; }
        if (!phoneInput || !phoneInput.value.trim()) { alert('Please enter your phone number.'); return; }
        var deliveryValue = '0';
        deliveryRadios.forEach(function(r, i) { if (r.checked) deliveryValue = String(i === 0 ? 1 : 0); });
        var paymentValue = 'cash';
        paymentRadios.forEach(function(r, i) { if (r.checked) { paymentValue = i === 0 ? 'cash' : (i === 1 ? 'card' : (i === 2 ? 'baridi' : (i === 3 ? 'paypal' : 'chargily'))); } });
        fetch('checkout_process.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'payment_method=' + encodeURIComponent(paymentValue) + '&delivery_type=' + encodeURIComponent(deliveryValue)
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                alert('Order #' + data.order_id + ' placed successfully!');
                document.getElementById('Check').classList.add('hidden');
                if (typeof loadCart === 'function') loadCart();
            } else {
                alert('Error: ' + (data.error || 'Failed to place order.'));
            }
        })
        .catch(function(e) { alert('Checkout error: ' + e.message); });
    });
});

/* ----- Load products from DB (added) ----- */
function loadProductsFromDB() {
    fetch('get_products.php')
    .then(function(r) { return r.json(); })
    .then(function(products) {
        if (!products || products.length === 0) return;
        // Cache products so static-card click handler can look up product ID by index
        window.__products = products;
        var allContainers = document.querySelectorAll('[id="Products"]');
        allContainers.forEach(function(container) { container.innerHTML = ''; });
        products.forEach(function(p) {
            var starsHtml = '';
            for (var i = 0; i < 5; i++) { starsHtml += '<i class="fa-regular fa-star"></i>'; }
            var cardHtml = '<div class="w-60 h-80 border cursor-pointer rounded-lg hover:scale-105 transition-all duration-200 ease-in-out relative">';
            cardHtml += '<a href="product_page.html?id=' + p.id + '" aria-label="see more">';
            cardHtml += '<img class="w-60 h-60 p-4" src="' + (p.image || 'img/default.jpg') + '" alt="' + p.product_name + '">';
            cardHtml += '<div class="flex flex-row gap-14"><div class="pl-4 flex flex-row gap-1 text-xs text-neutral-600">' + starsHtml + '</div><p class="text-xs w-20 h-3 text-gray-500"></p></div>';
            cardHtml += '<div class="pl-3"><h2 class="font-semibold hover:underline">' + p.product_name + '</h2><p class="text-xs text-gray-500 w-36">' + (p.category || '') + '</p></div>';
            cardHtml += '</a><div>';
            cardHtml += '<button title="Add to cart" class="add-to-cart hover:text-green-800 absolute right-3 bottom-8" data-id="' + p.id + '"><i class="fa-solid fa-cart-plus"></i></button>';
            cardHtml += '<h2 class="bg-zinc-900 text-white rounded-lg text-sm p-1 absolute right-2 bottom-1">Price : <span class="text-green-600">' + Number(p.price).toLocaleString() + ' DA</span></h2></div></div>';

            var cat = (p.category || '').toLowerCase();
            var allBox = document.querySelector('#all [id="Products"]');
            if (allBox) allBox.innerHTML += cardHtml;
            if (cat.indexOf('fruit') !== -1 || cat.indexOf('vegetable') !== -1) {
                var fBox = document.querySelector('#Fruits [id="Products"]');
                if (fBox) fBox.innerHTML += cardHtml;
            } else if (cat.indexOf('grain') !== -1) {
                var gBox = document.querySelector('#gr [id="Products"]');
                if (gBox) gBox.innerHTML += cardHtml;
            } else if (cat.indexOf('livestock') !== -1) {
                var lBox = document.querySelector('#liv [id="Products"]');
                if (lBox) lBox.innerHTML += cardHtml;
            } else if (cat.indexOf('seed') !== -1) {
                var sBox = document.querySelector('#se [id="Products"]');
                if (sBox) sBox.innerHTML += cardHtml;
            } else if (cat.indexOf('equipement') !== -1 || cat.indexOf('equipements') !== -1) {
                var eBox = document.querySelector('#eq [id="Products"]');
                if (eBox) eBox.innerHTML += cardHtml;
            } else if (cat.indexOf('honey') !== -1 || cat.indexOf('natural') !== -1) {
                var hBox = document.querySelector('#hn [id="Products"]');
                if (hBox) hBox.innerHTML += cardHtml;
            }
        });
    })
    .catch(function(e) { console.error('Load products error:', e); });
}

/* ----- loadCart: fetch & render cart from DB with total (added) ----- */
function loadCart() {
    var countEl = document.getElementById('item count') || document.querySelector('[id="item count"]');
    // Multi-strategy container finder: id may have trailing space
    var container = document.getElementById('utilisateur') || document.querySelector('[id^="utilisateur"]') || document.querySelector('#cart .ml-6 > div[id]') || document.querySelector('#cart .ml-6 > :nth-child(2)');
    if (!container) { console.warn('Cart container not found'); return; }
    fetch('get_cart.php')
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.error) {
            if (data.error === 'Not logged in') {
                if (countEl) countEl.textContent = '0 items';
                container.innerHTML = '<div class="flex items-center justify-center py-10"><p class="text-sm text-gray-400">Sign in to view cart</p></div>';
            } else {
                container.innerHTML = '<div class="flex items-center justify-center py-10"><p class="text-sm text-gray-400">' + data.error + '</p></div>';
            }
            return;
        }
        if (countEl) countEl.textContent = data.count + ' item' + (data.count !== 1 ? 's' : '');
        var html = '';
        if (data.items && data.items.length > 0) {
            html += '<div class="overflow-y-auto px-4 py-3 flex flex-col gap-3" style="max-height:300px">';
            data.items.forEach(function(item) {
                html += '<div class="flex items-center gap-3 p-3 rounded-xl border border-green-100 bg-green-50 relative">';
                html += '<img class="w-16 h-16 rounded-lg object-cover border border-green-200" src="' + (item.image || 'img/default.jpg') + '" alt="' + item.product_name + '">';
                html += '<div class="flex-1">';
                html += '<p class="text-sm font-semibold text-gray-800">' + escapeHtml(item.product_name) + '</p>';
                html += '<p class="text-xs text-gray-400 mt-0.5">Qty: ' + item.quantity + '</p>';
                html += '<p class="text-sm font-bold text-green-600 mt-1">' + Number(item.subtotal).toLocaleString() + ' DA</p>';
                html += '</div>';
                html += '<button class="remove-cart-item absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200" data-id_pp="' + item.id_pp + '"><i class="fa-solid fa-trash text-xs"></i></button>';
                html += '</div>';
            });
            html += '</div>';
            html += '<div class="border-t border-gray-100 px-5 py-4 flex flex-col gap-3">';
            html += '<div class="flex items-center justify-between">';
            html += '<span class="text-sm font-semibold text-gray-700">Total</span>';
            html += '<span class="text-lg font-bold text-green-600">' + Number(data.total).toLocaleString() + ' DA</span>';
            html += '</div></div>';
            // Update checkout total too
            var checkoutTotal = document.querySelector('#Check .border-t.border-t-green-500 span:last-child');
            if (checkoutTotal) checkoutTotal.textContent = Number(data.total).toLocaleString() + ' DA';
        } else {
            html = '<div class="flex items-center justify-center py-10"><p class="text-sm text-gray-400">Your cart is empty</p></div>';
        }
        container.innerHTML = html;
        container.querySelectorAll('.remove-cart-item').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id_pp = this.getAttribute('data-id_pp');
                if (!id_pp) return;
                var fd = new FormData();
                fd.append('id_pp', id_pp);
                fetch('remove_from_cart_process.php', { method: 'POST', body: fd })
                .then(function(r) { return r.json(); })
                .then(function(resp) {
                    if (resp.success) loadCart();
                    else alert('Error: ' + (resp.error || 'Could not remove'));
                })
                .catch(function(e) { console.error('Remove cart error:', e); });
            });
        });
    })
    .catch(function(e) { console.error('Cart load error:', e); });
}

/* ----- Helper: escape HTML entities (added) ----- */
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ----- Add-to-cart handler (added, runs sync) ----- */
document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-id]');
    if (!btn || !btn.classList.contains('add-to-cart')) {
        var icon = e.target.closest('.fa-cart-plus');
        if (!icon) return;
        btn = icon.closest('button');
        if (!btn) return;
    }
    e.preventDefault();
    var id = btn.dataset.id || btn.getAttribute('data-id');
    if (!id) {
        var card = btn.closest('[class*="w-60"], [class*="h-80"]');
        if (card) {
            var parent = card.parentNode;
            if (parent) {
                var cards = parent.querySelectorAll(':scope > [class*="w-60"]');
                for (var ci = 0; ci < cards.length; ci++) {
                    if (cards[ci] === card) {
                        var prods = window.__products || [];
                        if (prods[ci]) id = prods[ci].id;
                        break;
                    }
                }
            }
        }
        if (!id) return;
    }
    fetch('add_to_cart_process.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'product_id=' + id
    })
    .then(function(r) { return r.text(); })
    .then(function(data) {
        data = data.trim();
        if (data === 'success') {
            btn.classList.add('text-green-600');
            setTimeout(function() { btn.classList.remove('text-green-600'); }, 1500);
            setTimeout(function() { if (typeof loadCart === 'function') loadCart(); }, 300);
        } else if (data === 'error') {
            btn.classList.add('text-red-600');
            setTimeout(function() { btn.classList.remove('text-red-600'); }, 1500);
            if (confirm('Please sign in to add items to cart. Go to login?')) {
                window.location.href = 'login.html';
            }
        }
    })
    .catch(function(e) { console.error('Add to cart error:', e); });
});

/* ----- Force openCart to always load cart on open (added) ----- */
(function() {
    var orig = window.openCart;
    window.openCart = function() {
        if (typeof loadCart === 'function') loadCart();
        var c = document.getElementById('cart');
        if (c) c.classList.add('active');
    };
})();

/* ----- Fix index.html Login/Sign in buttons (no onclick in HTML) (added) ----- */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button:not([onclick])').forEach(function(btn) {
        var txt = (btn.textContent || '').trim();
        if (txt === 'Login') {
            btn.addEventListener('click', function() { window.location.href = 'login.html'; });
        } else if (txt === 'Sign in') {
            btn.addEventListener('click', function() { window.location.href = 'signup.html'; });
        }
    });
});