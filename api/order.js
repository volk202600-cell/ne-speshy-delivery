export default async function handler(req,res){
 const TOKEN=process.env.TG_TOKEN;
 const CHAT=process.env.TG_CHAT;
 const {name,phone,address,comment,payment,cart}=req.body;

 const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 const items=cart.map(i=>`• ${i.name} x${i.qty}`).join("\n");

 const text=`🛒 НОВЕ ЗАМОВЛЕННЯ
Ім'я: ${name}
Телефон: ${phone}
Адреса: ${address}
Коментар: ${comment}
Оплата: ${payment}

${items}

Сума: ${total} ₴`;

 await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({chat_id:CHAT,text})
 });

 res.status(200).json({ok:true});
}