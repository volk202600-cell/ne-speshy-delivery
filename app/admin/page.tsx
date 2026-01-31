import { menu } from "../../data/menu";

export default function AdminPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>🛠 Адмінка — НЕ СПЕШИ</h1>

      {menu.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12,
            borderRadius: 8,
          }}
        >
          <b>{item.name}</b> — {item.price} грн
          <p>{item.description}</p>
        </div>
      ))}

      <hr />
      <p>✏️ Щоб змінити меню — редагуй файл <b>data/menu.ts</b></p>
    </main>
  );
}
