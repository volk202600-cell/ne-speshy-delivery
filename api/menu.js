export default async function handler(req,res){
  const TOKEN = process.env.POSTER_TOKEN;
  try{
    const r = await fetch(`https://joinposter.com/api/menu.getProducts?token=${TOKEN}`);
    const data = await r.json();

    const menu = data.response
      .filter(i => i.visible === 1)
      .map(i => ({
        name: i.product_name,
        price: Number(i.price),
        photo: i.photo || 'https://via.placeholder.com/400x300?text=No+Image'
      }));

    res.status(200).json(menu);
  }catch(e){
    res.status(500).json({error:'Poster API error'});
  }
}