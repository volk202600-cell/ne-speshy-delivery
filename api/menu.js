export default async function handler(req, res) {
  const TOKEN = process.env.POSTER_TOKEN;

  try {
    const r = await fetch(
      `https://ne-speshi-bar.joinposter.com/api/menu.getProducts?token=${TOKEN}&with_price=1`
    );

    const data = await r.json();

    if (!data.response) {
      return res.status(500).json({ error: "Poster error", data });
    }

    const menu = data.response.map(item => ({
      name: item.product_name,
      price: item.price ? Number(item.price) / 100 : 0,
      photo: item.photo
        ? `https://ne-speshi-bar.joinposter.com${item.photo}`
        : 'https://via.placeholder.com/400x300?text=No+Image'
    }));

    res.status(200).json(menu);

  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}
