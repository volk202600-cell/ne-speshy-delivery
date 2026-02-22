export default async function handler(req, res) {
  const TOKEN = process.env.POSTER_TOKEN;

  try {
    const r = await fetch(
      `https://ne-speshi-bar.joinposter.com/api/menu.getProducts?token=${TOKEN}`
    );

    const data = await r.json();

    if (!data.response) {
      return res.status(500).json({ error: "Poster error", data });
    }

    const menu = data.response.map(item => {

      let price = 0;

      if (item.price) {
        price = Number(item.price) / 100;
      }

      if (item.prices && item.prices[0]?.price) {
        price = Number(item.prices[0].price) / 100;
      }

      if (Array.isArray(item.price) && item.price[0]?.value) {
        price = Number(item.price[0].value) / 100;
      }

      return {
        name: item.product_name,
        price: price,
        photo: item.photo
          ? `https://ne-speshi-bar.joinposter.com${item.photo}`
          : 'https://via.placeholder.com/400x300?text=No+Image'
      };
    });

    res.status(200).json(menu);

  } catch (e) {
    res.status(500).json({ error: "Server error", message: e.message });
  }
}
