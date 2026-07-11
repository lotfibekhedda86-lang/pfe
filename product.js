// cart 
var cart = document.getElementById('cart');

function openCart() {
  if (typeof loadCart === 'function') loadCart();
  cart.classList.add('active');
}

function closeCart() {
  cart.classList.remove('active');

}


function goToCategory(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}


// profile 
var prof = document.getElementById('prof');

function openProfile() {

  prof.classList.add('active');

}
function closeProfile() {
  prof.classList.remove('active');
}

const dd = document.getElementById('dropdown')

dd.classList.remove('-translate-x-full', 'opacity-0', 'pointer-events-none')
dd.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto')


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.role === "guest") {

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
`;
      document.getElementById("btn").disabled = true;
      var c = document.getElementById('btn');
      c.classList.add("bg-gray-400");
      c.classList.add("hover:bg-gray-400");


      document.getElementById("add").disabled = true;
      var c = document.getElementById('add');
      c.classList.add("bg-gray-400");
      c.classList.add("hover:bg-gray-400");


      document.getElementById("in").disabled = true;
      document.getElementById("txt").disabled = true;
      document.getElementById("plus").disabled = true;
      document.getElementById("minus").disabled = true;

      var d = document.getElementById("minus");
      d.classList.add("hover:bg-transparent");
      var d = document.getElementById("plus");
      d.classList.add("hover:bg-transparent");


      const a = document.getElementById('ct');
      a.classList.add("blur-sm");
      a.classList.add("bg-gray-100");
      a.classList.add("text black");




    }



    else {


      if (user.role === "client" || user.role === "seller") {
        document.getElementById('navbardiv').innerHTML += `<p>Welcome, ${user.name}</p>`;
        document.getElementById('profile').innerHTML += `<div class="p-6 flex flex-col items-center border-b border-gray-50">
    <div class="relative group">
      <img src="https://via.placeholder.com/80" alt="Avatar" class="w-20 h-20 rounded-full border-2 border-blue-500 p-1">
      <button class="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full text-xs shadow-lg hover:bg-blue-700">
        <i class="fa-solid fa-camera"></i>
      </button>
    </div>
    <h2 class="mt-3 font-bold text-gray-800 text-lg">John Doe</h2>
    <p class="text-xs text-gray-500">+213 555 12 34 56</p>
  </div>

  <div class="flex justify-around p-3 bg-gray-50">
    <button title="Nouvelle Annonce" class="flex flex-col items-center text-blue-600 hover:text-blue-800">
      <i class="fa-solid fa-bullhorn text-xl"></i>
      <span class="text-[10px] mt-1 font-bold">Annonce</span>
    </button>
    <button title="Déconnexion" class="flex flex-col items-center text-red-500 hover:text-red-700">
      <i class="fa-solid fa-right-from-bracket text-xl"></i>
      <span class="text-[10px] mt-1 font-bold">logout</span>
    </button>
  </div>

  <div class="p-4 border-b border-gray-50">
    <div class="flex items-center gap-2 mb-3 text-gray-700">
      <i class="fa-solid fa-gear text-sm"></i>
      <span class="text-sm font-semibold">Settings</span>
    </div>
    <ul class="space-y-2 text-sm text-gray-600">
      <li class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition">
        <span>Change Name</span>
        <i class="fa-solid fa-chevron-right text-[10px]"></i>
      </li>
      <li class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition">
        <span>Change Password</span>
        <i class="fa-solid fa-lock text-[10px]"></i>
      </li>
      <li class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition">
        <span>Email & phone Number</span>
        <i class="fa-solid fa-pen text-[10px]"></i>
      </li>
    </ul>
  </div>

  <div class="p-4 border-b border-gray-50">
    <span class="text-xs font-bold text-gray-400 uppercase">My publications/span>
    <div class="mt-3 space-y-3">
      <div class="flex justify-between items-center">
        <div class="text-xs">
          <p class="font-medium text-gray-800">sdsdsds</p>
          <p class="text-[10px] text-gray-400">date</p>
        </div>
        <span class="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full">Actif</span>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-xs">
          <p class="font-medium text-gray-800">dsdsdsd</p>
          <p class="text-[10px] text-gray-400">date</p>
        </div>
        <span class="bg-gray-100 text-gray-500 text-[9px] px-2 py-0.5 rounded-full">Vendu</span>
      </div>
    </div>
  </div>

  <div class="p-4">
    <span class="text-xs font-bold text-gray-400 uppercase">My Deals (Succès)</span>
    <div class="mt-3 space-y-3">
      <div class="flex items-start gap-3">
        <div class="bg-blue-50 p-2 rounded">
          <i class="fa-solid fa-check text-blue-600 text-xs"></i>
        </div>
        <div>
          <p class="text-xs font-medium text-gray-800">sdsdsdsd</p>
          <p class="text-[10px] text-gray-400">date</p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <div class="bg-blue-50 p-2 rounded">
          <i class="fa-solid fa-check text-blue-600 text-xs"></i>
        </div>
        <div>
          <p class="text-xs font-medium text-gray-800">dqdqdqdqd</p>
          <p class="text-[10px] text-gray-400">date</p>
        </div>
      </div>
    </div>
  </div> `;


        document.querySelector('[id^="utilisateur"]').innerHTML = `

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
        document.getElementById('Checkout').innerHTML += `<button 
    class=" w-72 bg-green-500 hover:bg-green-400 transition-all duration-100 ease-in-out text-white text-sm font-semibold py-3 rounded-xl  flex items-center justify-center gap-2">
      <i class="fa-solid fa-bag-shopping"></i> Checkout
    </button> `;

      }
    }
  }
});

/* ----- Load product data from DB (merged, no duplicate fetch) ----- */
var appScript = document.createElement('script');
appScript.src = 'app.js';
appScript.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var pid = params.get('id');
    if (!pid) return;
    fetch('get_product_by_id.php?id=' + pid)
    .then(function(r) { return r.json(); })
    .then(function(product) {
        if (!product || product.error) return;
        // Basic info
        var titleEl = document.querySelector('h1.serif');
        if (titleEl) titleEl.textContent = product.product_name;
        var priceEl = document.querySelector('.text-2xl.font-light');
        if (priceEl) priceEl.textContent = Number(product.price).toLocaleString() + ' DA';
        var mainImg = document.getElementById('main-img');
        if (mainImg && product.image) mainImg.src = product.image;
        // Seller info
        var sellerSpan = document.querySelector('.flex.items-center.gap-2.text-sm.text-gray-400 span.cursor-pointer');
        if (sellerSpan && product.seller_name) sellerSpan.textContent = product.seller_name;
        // Phone
        var ct = document.getElementById('ct');
        if (ct && product.seller_phone) ct.textContent = product.seller_phone;
        // Description (clean Location line)
        var desc = product.description || '';
        var wilaya = '';
        var match = desc.match(/Location:\s*(Wilaya\s*\d+|[\w\s]+)/i);
        if (match) {
            wilaya = match[1].trim();
            desc = desc.replace(/\n?\s*Location:\s*[\w\s]+\n?/i, '').trim();
        }
        var descEl = document.querySelector('p.text-sm.text-black');
        if (descEl) descEl.textContent = desc;
        // Place
        var placeEl = document.querySelector('.flex.items-center.gap-2.text-sm.text-gray-400 span.text-gray-300');
        if (placeEl) placeEl.textContent = wilaya || 'Algeria';
        // Thumbnails
        var thumbs = document.querySelectorAll('.thumb');
        var allImages = [];
        if (product.images && product.images.length) allImages = product.images;
        if (product.image) allImages.unshift(product.image);
        allImages = allImages.filter(function(s) { return s && s.trim(); });
        var unique = [];
        allImages.forEach(function(s) { if (unique.indexOf(s) === -1) unique.push(s); });
        thumbs.forEach(function(t, i) { if (unique[i]) t.src = unique[i]; else t.style.display = 'none'; });
        // Add to cart button
        var addBtn = document.getElementById('add');
        if (addBtn) addBtn.dataset.id = product.id;
        // Reviews, rating, related
        if (typeof loadReviews === 'function') loadReviews(pid);
        if (typeof setupStarRating === 'function') setupStarRating();
        if (typeof setupReviewSubmit === 'function') setupReviewSubmit(pid);
        if (typeof loadRelatedProducts === 'function') loadRelatedProducts(product.category, pid);
    })
    .catch(function(e) { console.error('Product load error:', e); });
};
document.body.appendChild(appScript);

/* ----- Cart (DB-based, like main.js) ----- */
var origLoad = appScript.onload;
appScript.onload = function() {
    if (origLoad) origLoad();
    var plus = document.getElementById('plus');
    var minus = document.getElementById('minus');
    var qtyEl = document.getElementById('qty');
    if (plus && qtyEl) plus.onclick = function() { var v = parseInt(qtyEl.textContent) || 1; if (v < 99) qtyEl.textContent = v + 1; };
    if (minus && qtyEl) minus.onclick = function() { var v = parseInt(qtyEl.textContent) || 1; if (v > 1) qtyEl.textContent = v - 1; };
    document.getElementById('add').onclick = function() {
        var id = this.dataset.id;
        if (!id) return;
        var qty = parseInt(document.getElementById('qty').textContent) || 1;
        fetch('add_to_cart_process.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'product_id=' + id + '&quantity=' + qty
        })
        .then(function(r) { return r.text(); })
        .then(function(data) {
            if (data === 'success' && typeof loadCart === 'function') loadCart();
        });
    };
};

// Click AGriTrade logo -> main.html (but not on profile/cart icons)
document.addEventListener('DOMContentLoaded', function() {
    var els = document.querySelectorAll('div, span, p, h1, h2');
    for (var i = 0; i < els.length; i++) {
        if (els[i].textContent.trim() === 'AGriTrade') {
            els[i].addEventListener('click', function(e) {
                if (e.target.closest('li') || e.target.closest('button')) return;
                window.location.href = 'main.html';
            });
            break;
        }
    }
});

