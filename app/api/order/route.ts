import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  items: OrderItem[];
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    if (!body.name || !body.phone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Заповніть всі обов'язкові поля" },
        { status: 400 }
      );
    }

    const total = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const itemsList = body.items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(0)} грн`
      )
      .join("\n");

    const message = `🔔 *НОВЕ ЗАМОВЛЕННЯ*

👤 *Ім'я:* ${escapeMarkdown(body.name)}
📞 *Телефон:* ${escapeMarkdown(body.phone)}
📍 *Адреса:* ${escapeMarkdown(body.address)}
${body.comment ? `💬 *Коментар:* ${escapeMarkdown(body.comment)}` : ""}

📋 *Замовлення:*
${itemsList}

💰 *Загалом: ${total.toFixed(0)} грн*`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramRes.ok) {
      const errData = await telegramRes.json();
      console.error("Telegram API error:", errData);
      return NextResponse.json(
        { error: "Не вдалося надіслати замовлення" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}
