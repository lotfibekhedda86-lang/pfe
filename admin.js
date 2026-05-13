

function Opncmt() {

document.getElementById('Cmt').classList.remove('hidden');

}
function closecmt(){

    document.getElementById('Cmt').classList.add('hidden')
}

const a = document.getElementById('listings');
const b = document.getElementById('User');
const c = document.getElementById('order');
const d = document.getElementById('catego');



function openingL(){

a.classList.remove('hidden');

b.classList.add('hidden');
c.classList.add('hidden');
d.classList.add('hidden');


}


function openingO(){

c.classList.remove('hidden');

b.classList.add('hidden');
a.classList.add('hidden');
d.classList.add('hidden');

}

function openingC(){

d.classList.remove('hidden');

b.classList.add('hidden');
a.classList.add('hidden');
c.classList.add('hidden');


}
function openingU(){

b.classList.remove('hidden');

c.classList.add('hidden');
a.classList.add('hidden');
d.classList.add('hidden');

}

function logclose(){

document.getElementById('logout').classList.add('hidden');}


function logOpen(){

document.getElementById('logout').classList.remove('hidden');}