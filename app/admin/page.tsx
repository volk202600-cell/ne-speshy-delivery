"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://utzwzxczzjqwpbjbwlwc.supabase.co", // ← ТВОЯ URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0end6eGN6empxd3BiamJ3bHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MDA5NzQsImV4cCI6MjA4NTQ3Njk3NH0.vRHC--uCdCQyXQUrgRrGXiBIpWZoxu2cMhaOkqRc8pg" // ← ТІЛЬКИ anon public
);

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const addItem = async () => {
    const { error } = await supabase.from("menu").insert([
      {
        name,
        price: Number(price),
        description,
        image,
      },
    ]);

    if (error) {
      setStatus("❌ Помилка: " + error.message);
    } else {
      setStatus("✅ Додано!");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Адмінка</h1>

      <input
        placeholder="Назва"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Ціна"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="URL фото"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={addItem}>➕ Додати</button>

      <p>{status}</p>
    </div>
  );
}
