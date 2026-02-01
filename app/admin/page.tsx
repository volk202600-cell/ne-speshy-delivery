"use client";

import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>🛠 Адмінка — НЕ СПЕШИ</h1>

      <h3>Додати страву</h3>

      <input
        placeholder="Назва"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <input
        placeholder="Ціна"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <input
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <input
        placeholder="Картинка (burger1.jpg)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <button
        onClick={() => {
          alert(
            JSON.stringify(
              { name, price, description, image },
              null,
              2
            )
          );
        }}
      >
        ➕ Додати
      </button>
    </div>
  );
}
