
let cart = [];

async function loadMenu(){
 const res = await fetch('/api/menu');
 const data = await res.json();
 const container = document.getElementById('menu');
 container.innerHTML = '';
 data.forEach(item=>{
   const card = document.createElement('div');
   card.className='card';
   card.innerHTML = `
     <img src="${item.photo}" />
     <h3>${item.name}</h3>
     <p>${item.price} ₴</p>
     <button onclick='addToCart(${JSON.stringify(item)})'>Додати</button>
   `;
   container.appendChild(card);
 });
}

function addToCart(item){
 const existing = cart.find(i=>i.name===item.name);
 if(existing) existing.qty++;
 else cart.push({...item, qty:1});
 updateCart();
}

function updateCart(){
 document.getElementById('cartCount').innerText =
 cart.reduce((s,i)=>s+i.qty,0);
}

document.getElementById('cartBtn').onclick=()=>{
 document.getElementById('cartModal').classList.remove('hidden');
 renderCart();
};

document.getElementById('closeCart').onclick=()=>{
 document.getElementById('cartModal').classList.add('hidden');
};

function renderCart(){
 const box=document.getElementById('cartItems');
 box.innerHTML='';
 cart.forEach(i=>{
   box.innerHTML+=`<div>${i.name} x${i.qty}</div>`;
 });
}

document.getElementById('checkout').onclick=async()=>{
 const name=prompt("Ім'я");
 const phone=prompt("Телефон");
 const address=prompt("Адреса");
 const comment=prompt("Коментар");
 const payment=prompt("Готівка чи Онлайн?");

 await fetch('/api/order',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({name,phone,address,comment,payment,cart})
 });

 alert('Замовлення відправлено');
 cart=[];
 updateCart();
 document.getElementById('cartModal').classList.add('hidden');
};

loadMenu();
