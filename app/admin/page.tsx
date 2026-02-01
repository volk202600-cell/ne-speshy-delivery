"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const addItem = async () => {
    setStatus("⏳ додаю...");

    const { error } = await supabase.from("menu").insert([
      {
        name,
        price: Number(price),
        description,
        image
      }
    ]);

    if (error) {
      setStatus("❌ помилка: " + error.message);
    } else {
      setStatus("✅ страва додана");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <h1>⚙️ Адмінка — НЕ СПЕШИ</h1>

      <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Опис" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Картинка (burger1.jpg)" value={image} onChange={e => setImage(e.target.value)} />

      <button onClick={addItem} style={{ marginTop: 12 }}>
        ➕ Додати
      </button>

      <p>{status}</p>
    </div>
  );
}
