"use client";

import { useState } from "react";
import { menu } from "../../data/menu";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>🛠 Адмінка — НЕ СПЕШИ</h1>

      <h2>➕ Додати страву</h2>

      <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Опис" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Картинка (burger3.jpg)" value={image} onChange={e => setImage(e.target.value)} />

      <pre style={{ background: "#111", color: "#0f0", padding: 12, marginTop: 12 }}>
{`{
  id: "${name.toLowerCase().replaceAll(" ", "-")}",
  name: "${name}",
  price: ${price},
  description: "${description}",
  image: "/${image}"
},`}
      </pre>

      <p>⬆️ Скопіюй цей блок і встав у <b>data/menu.ts</b></p>

      <hr />

      <h2>📋 Поточне меню</h2>

      {menu.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
          <b>{item.name}</b> — {item.price} грн
          <p>{item.description}</p>
        </div>
      ))}
    </main>
  );
}
