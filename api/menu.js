
export default async function handler(req, res) {
  const TOKEN = process.env.POSTER_TOKEN;
  const ACCOUNT = process.env.POSTER_ACCOUNT;

  try {
    const response = await fetch(
      `https://${ACCOUNT}.joinposter.com/api/menu.getProducts?token=${TOKEN}`
    );

    const data = await response.json();

    if (!data.response) {
      return res.status(500).json({ error: "Poster error", data });
    }

    const menu = data.response.map(item => ({
      name: item.product_name,
      price: item.price1 ? Number(item.price1) / 100 : 0,
      photo: item.photo
        ? `https://${ACCOUNT}.joinposter.com${item.photo}`
        : ""
    }));

    res.status(200).json(menu);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
