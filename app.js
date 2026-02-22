let cart=[];

async function loadMenu(){
 const r=await fetch('/api/menu');
 const data=await r.json();
 const container=document.getElementById('menu');
 container.innerHTML='';
 data.forEach(item=>{
  const card=document.createElement('div');
  card.className='card';
  card.innerHTML=`
    <img src="${item.photo}">
    <div class="card-content">
    <h3>${item.name}</h3>
    <p>${item.price} ₴</p>
    <button>Додати</button>
    </div>
  `;
  card.querySelector('button').onclick=()=>addToCart(item);
  container.appendChild(card);
 });
}

function addToCart(item){
 const existing=cart.find(i=>i.name===item.name);
 if(existing) existing.qty++;
 else cart.push({...item,qty:1});
 updateCart();
}

function updateCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);
 const total=cart.reduce((s,i)=>s+i.qty*i.price,0);
 document.getElementById('cartCount').innerText=count;
 document.getElementById('cartTotal').innerText=total;
 renderCart();
}

function renderCart(){
 const box=document.getElementById('cartItems');
 box.innerHTML='';
 let total=0;
 cart.forEach(i=>{
  total+=i.qty*i.price;
  box.innerHTML+=`
   <div style="margin-bottom:10px">
    ${i.name}
    <div>
    <button onclick="changeQty('${i.name}',-1)">-</button>
    ${i.qty}
    <button onclick="changeQty('${i.name}',1)">+</button>
    </div>
   </div>`;
 });
 document.getElementById('totalPrice').innerText=total;
}

function changeQty(name,val){
 const item=cart.find(i=>i.name===name);
 item.qty+=val;
 if(item.qty<=0) cart=cart.filter(i=>i.name!==name);
 updateCart();
}

document.getElementById('floatingCart').onclick=()=>{
 document.getElementById('cartDrawer').classList.add('open');
};

document.getElementById('closeCart').onclick=()=>{
 document.getElementById('cartDrawer').classList.remove('open');
};

document.getElementById('checkoutBtn').onclick=()=>{
 document.getElementById('orderModal').classList.remove('hidden');
};

document.getElementById('closeOrder').onclick=()=>{
 document.getElementById('orderModal').classList.add('hidden');
};

document.getElementById('sendOrder').onclick=async()=>{
 const name=document.getElementById('name').value;
 const phone=document.getElementById('phone').value;
 const address=document.getElementById('address').value;
 const comment=document.getElementById('comment').value;
 const payment=document.getElementById('payment').value;

 await fetch('/api/order',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({name,phone,address,comment,payment,cart})
 });

 alert('Замовлення відправлено');
 cart=[];
 updateCart();
 document.getElementById('orderModal').classList.add('hidden');
 document.getElementById('cartDrawer').classList.remove('open');
};

loadMenu();