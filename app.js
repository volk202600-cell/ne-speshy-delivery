let cart=[];

async function loadMenu(){
  const res = await fetch('/api/menu');
  return res.json();
}

function renderMenu(menu){
  const c=document.getElementById('catalog');
  menu.forEach(it=>{
    const d=document.createElement('div');
    d.className='card';
    d.innerHTML=`
      <img src="${it.photo}">
      <b>${it.name}</b>
      <div>${it.price} ₴</div>
      <button class="btn">Додати</button>
    `;
    d.querySelector('button').onclick=e=>addToCart(it,e.target);
    c.appendChild(d);
  });
}

function addToCart(it,btn){
  const f=cart.find(i=>i.name===it.name);
  if(f)f.qty++;else cart.push({...it,qty:1});
  animate(btn);
  updateCart();
}

function updateCart(){
  let count=0,sum=0;
  cart.forEach(i=>{count+=i.qty;sum+=i.qty*i.price});
  document.getElementById('cart-count').innerText=count;
  document.getElementById('cart-total').innerText=sum+' ₴';
}

function animate(btn){
  const r=btn.getBoundingClientRect();
  const c=document.getElementById('open-cart').getBoundingClientRect();
  const d=document.createElement('div');
  d.className='fly-dot';
  d.style.left=r.left+'px';
  d.style.top=r.top+'px';
  document.body.appendChild(d);
  setTimeout(()=>{
    d.style.left=c.left+'px';
    d.style.top=c.top+'px';
    d.style.opacity=0;
  },10);
  setTimeout(()=>d.remove(),600);
}

document.getElementById('open-cart').onclick=()=>document.getElementById('cart-drawer').classList.add('open');
document.getElementById('close-cart').onclick=()=>document.getElementById('cart-drawer').classList.remove('open');

window.onload=async()=>{
  const menu=await loadMenu();
  renderMenu(menu);
};