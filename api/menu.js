export default async function handler(req, res) {
  const TOKEN = process.env.POSTER_TOKEN;

  try {
    const r = await fetch(
      `https://ne-speshi-bar.joinposter.com/api/menu.getProducts?token=${TOKEN}`
    );

    const data = await r.json();

    const menu = data.response.map(item => ({
      name: item.product_name,
      price:
        item.price1
          ? Number(item.price1) / 100
          : item.price2
          ? Number(item.price2) / 100
          : 0,
      photo: item.photo
        ? `https://ne-speshi-bar.joinposter.com${item.photo}`
        : 'https://via.placeholder.com/400x300?text=No+Image'
    }));

    res.status(200).json(menu);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
