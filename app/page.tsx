import { menu } from "../data/menu";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>🍔 НЕ СПЕШИ</h1>
      <p>Сайт доставки їжі</p>

      <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              maxWidth: 400,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <b>{item.price} грн</b>
          </div>
        ))}
      </div>
    </main>
  );
}
