
export default async function handler(req, res) {
  const TOKEN = process.env.TG_TOKEN;
  const CHAT_ID = process.env.TG_CHAT;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, address, comment, payment, cart } = req.body;

  const items = cart
    .map(i => `• ${i.name} x${i.qty} — ${i.price * i.qty} ₴`)
    .join("\n");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const text = `🛒 НОВЕ ЗАМОВЛЕННЯ

👤 Імʼя: ${name}
📞 Телефон: ${phone}
📍 Адреса: ${address}
💬 Коментар: ${comment || "-"}
💳 Оплата: ${payment}

${items}

💰 Сума: ${total} ₴`;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text
    })
  });

  res.status(200).json({ success: true });
}
