"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://utzwzxczzjqwpbjwblwc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0end6eGN6empxd3BiamJ3bHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MDA5NzQsImV4cCI6MjA4NTQ3Njk3NH0.vRHC--uCdCQyXQUrgRrGXiBIpWZoxu2cMhaOkqRc8pg"
);

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function addItem() {
    setLoading(true);

    const { error } = await supabase.from("menu").insert([
      {
        name,
        price: Number(price),
        description,
        image,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("❌ Помилка: " + error.message);
    } else {
      alert("✅ Страву додано");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>🍔 Адмінка меню</h1>

      <input
        placeholder="Назва"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Ціна"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Фото (URL)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={addItem} disabled={loading}>
        ➕ Додати
      </button>
    </div>
  );
}
