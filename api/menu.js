
export default async function handler(req,res){
 const TOKEN=process.env.POSTER_TOKEN;
 const ACCOUNT=process.env.POSTER_ACCOUNT;

 const r=await fetch(`https://${ACCOUNT}.joinposter.com/api/menu.getProducts?token=${TOKEN}`);
 const d=await r.json();

 if(!d.response) return res.status(500).json(d);

 const menu=d.response.map(p=>({
   name:p.product_name,
   price:p.price1?Number(p.price1)/100:0,
   photo:p.photo?`https://${ACCOUNT}.joinposter.com${p.photo}`:''
 }));

 res.status(200).json(menu);
}
