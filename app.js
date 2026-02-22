let cart=[];

const demoMenu=[
{name:"Стейк Ribeye",price:280,photo:"https://picsum.photos/400/300?1"},
{name:"Стейк Cowboy",price:220,photo:"https://picsum.photos/400/300?2"},
{name:"Мідії у вершковому соусі",price:330,photo:"https://picsum.photos/400/300?3"}
];

function renderMenu(){
const c=document.getElementById('catalog');
demoMenu.forEach(item=>{
const d=document.createElement('div');
d.className='card';
d.innerHTML=`
<img src="${item.photo}">
<h3>${item.name}</h3>
<p>${item.price} ₴</p>
<button class="primary">Додати</button>
`;
d.querySelector('button').onclick=()=>addToCart(item);
c.appendChild(d);
});
}

function addToCart(item){
const f=cart.find(i=>i.name===item.name);
if(f)f.qty++; else cart.push({...item,qty:1});
updateCart();
}

function updateCart(){
document.getElementById('cartCount').innerText=cart.reduce((s,i)=>s+i.qty,0);
document.getElementById('cartItems').innerHTML=cart.map(i=>`<div>${i.name} x${i.qty}</div>`).join('');
document.getElementById('total').innerText=cart.reduce((s,i)=>s+i.qty*i.price,0);
}

document.getElementById('cartBtn').onclick=()=>{
document.getElementById('cartDrawer').classList.toggle('open');
};

document.getElementById('checkoutBtn').onclick=async()=>{
const name=prompt("Ваше ім'я");
const phone=prompt("Телефон");
const address=prompt("Адреса доставки");
const comment=prompt("Коментар (необов'язково)");
const payment=prompt("Оплата: готівка чи онлайн");

if(!name||!phone||!address) return alert("Заповніть всі поля");

await fetch('/api/order',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({name,phone,address,comment,payment,cart})
});

alert("Дякуємо! Замовлення прийняте.");
cart=[];
updateCart();
};
renderMenu();
