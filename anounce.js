// Pour chaque input fichier
document.querySelectorAll('.img-input').forEach(function (input) {
    input.addEventListener('change', function () {

        var slot = this.closest('.img-slot');

        // Afficher l'image choisie
        var img = slot.querySelector('.preview');
        img.src = URL.createObjectURL(this.files[0]);
        img.classList.remove('hidden');

        // Cacher le placeholder (📷 ou +)
        slot.querySelector('.placeholder').classList.add('hidden');

        // Afficher le bouton supprimer
        slot.querySelector('.btn-delete').classList.remove('hidden');

    });
});

// Bouton supprimer
document.querySelectorAll('.btn-delete').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        var slot = this.closest('.img-slot');

        // Cacher l'image
        var img = slot.querySelector('.preview');
        img.src = '';
        img.classList.add('hidden');

        // Remettre le placeholder
        slot.querySelector('.placeholder').classList.remove('hidden');

        // Cacher le bouton supprimer
        this.classList.add('hidden');

        // Vider l'input pour pouvoir rechoisir le même fichier
        slot.querySelector('.img-input').value = '';

    });
});



document.getElementById('desc').addEventListener('input', function () {
    document.getElementById('desc-cnt').textContent = this.value.length + ' / 1000';
});
function calcDiscount() {
    var o = parseFloat(document.getElementById('oldPrice').value);
    var n = parseFloat(document.getElementById('newPrice').value);
    var pill = document.getElementById('discountPill');
    var text = document.getElementById('discountText');
    if (o > 0 && n > 0 && o > n) {
        var pct = Math.round((o - n) / o * 100);
        pill.textContent = '-' + pct + '%';
        text.textContent = 'You save ' + (o - n).toLocaleString() + ' DZD';
    } else {
        pill.textContent = ''; text.textContent = '';
    }
}
document.getElementById('oldPrice').addEventListener('input', calcDiscount);
document.getElementById('newPrice').addEventListener('input', calcDiscount);



function setupToggle(cls) {
    document.querySelectorAll('.' + cls).forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.' + cls).forEach(function (b) {
                b.classList.remove('border-green-500', 'bg-green-50', 'text-green-700', 'font-semibold');
                b.classList.add('border-gray-200', 'text-gray-400');
            });
            this.classList.add('border-green-500', 'bg-green-50', 'text-green-700', 'font-semibold');
            this.classList.remove('border-gray-200', 'text-gray-400');
        });
    });
}
setupToggle('cond-btn');
setupToggle('neg-btn');
setupToggle('del-btn');

/* ----- Publish button handler: submit product to DB (added) ----- */
document.addEventListener('DOMContentLoaded', function() {
    var publishBtn = document.querySelector('.flex.gap-3.pb-4 .bg-green-700');
    if (!publishBtn) return;
    publishBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var name = document.querySelector('input[placeholder="e.g. Fresh tomatoes..."]');
        var category = document.querySelector('select');
        var qty = document.querySelector('input[type="number"][min="1"]');
        var desc = document.getElementById('desc');
        var price = document.getElementById('newPrice');

        if (!name || !name.value.trim()) { alert('Please enter a product name.'); return; }
        if (!price || !price.value) { alert('Please enter a price.'); return; }
        if (!desc || !desc.value.trim()) { alert('Please enter a description.'); return; }

        var formData = new FormData();
        formData.append('product_name', name.value.trim());
        formData.append('category', category ? category.value : '');
        formData.append('quantity', qty ? qty.value : '1');
        formData.append('description', desc.value.trim());
        formData.append('price', price.value);

        // images: first via 'image', rest via 'images[]'
        var imgInputs = document.querySelectorAll('.img-input');
        var firstDone = false;
        imgInputs.forEach(function(inp) {
            if (inp.files && inp.files[0]) {
                if (!firstDone) { formData.append('image', inp.files[0]); firstDone = true; }
                else { formData.append('images[]', inp.files[0]); }
            }
        });

        // wilaya (the second select in the page, after category)
        var wilSel = document.querySelectorAll('select')[1];
        if (wilSel && wilSel.value) {
            var wilText = wilSel.options[wilSel.selectedIndex].text;
            formData.append('wilaya', wilText);
        }

        // commune
        var comInput = document.querySelector('input[placeholder*="Bab Ezzouar"]');
        if (comInput && comInput.value.trim()) formData.append('commune', comInput.value.trim());

        // phone
        var phoneInput = document.querySelector('input[placeholder*="+213"]');
        if (phoneInput && phoneInput.value.trim()) formData.append('phone', phoneInput.value.trim());

        fetch('upload_product.php', {
            method: 'POST',
            body: formData
        })
        .then(function(r) {
            if (r.redirected) { window.location.href = r.url; return; }
            return r.text();
        })
        .then(function(text) {
            if (text) {
                if (text.indexOf('Error') !== -1) { alert(text); }
                else { window.location.href = 'main.html?success=uploaded'; }
            }
        })
        .catch(function(e) { alert('Upload failed: ' + e.message); });
    });
});