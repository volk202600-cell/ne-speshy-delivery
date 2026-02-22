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
   <div class="card-body">
     <h3>${item.name}</h3>
     <p>${item.price} ₴</p>
     <button class="btn primary">Додати</button>
   </div>`;
  card.querySelector('button').onclick=()=>add(item);
  container.appendChild(card);
 });
}

function add(item){
 const ex=cart.find(i=>i.name===item.name);
 if(ex) ex.qty++;
 else cart.push({...item,qty:1});
 update();
}

function update(){
 const count=cart.reduce((s,i)=>s+i.qty,0);
 const total=cart.reduce((s,i)=>s+i.qty*i.price,0);
 document.getElementById('cartCount').innerText=count;
 document.getElementById('cartTotal').innerText=total;
 renderDrawer();
}

function renderDrawer(){
 const box=document.getElementById('cartItems');
 box.innerHTML='';
 let total=0;
 cart.forEach(i=>{
  total+=i.qty*i.price;
  box.innerHTML+=`
   <div style="margin-bottom:10px">
     ${i.name}
     <div>
       <button onclick="change('${i.name}',-1)">-</button>
       ${i.qty}
       <button onclick="change('${i.name}',1)">+</button>
     </div>
   </div>`;
 });
 document.getElementById('totalPrice').innerText=total;
}

function change(name,v){
 const item=cart.find(i=>i.name===name);
 item.qty+=v;
 if(item.qty<=0) cart=cart.filter(i=>i.name!==name);
 update();
}

document.getElementById('floatingCart').onclick=()=>{
 document.getElementById('drawer').classList.add('open');
};

document.getElementById('closeDrawer').onclick=()=>{
 document.getElementById('drawer').classList.remove('open');
};

document.getElementById('checkoutBtn').onclick=()=>{
 document.getElementById('modal').classList.remove('hidden');
};

document.getElementById('closeModal').onclick=()=>{
 document.getElementById('modal').classList.add('hidden');
};

document.getElementById('sendOrder').onclick=async()=>{
 const name=nameInput.value;
 const phone=phoneInput.value;
 const address=addressInput.value;
 const comment=commentInput.value;
 const payment=paymentInput.value;

 await fetch('/api/order',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({name,phone,address,comment,payment,cart})
 });

 alert("Замовлення відправлено");
 cart=[];
 update();
 document.getElementById('modal').classList.add('hidden');
 document.getElementById('drawer').classList.remove('open');
};

const nameInput=document.getElementById('name');
const phoneInput=document.getElementById('phone');
const addressInput=document.getElementById('address');
const commentInput=document.getElementById('comment');
const paymentInput=document.getElementById('payment');

loadMenu();