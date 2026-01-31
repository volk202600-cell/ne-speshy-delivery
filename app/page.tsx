export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>НЕ СПЕШИ 🍔</h1>
      <p>Сайт доставки їжі</p>

      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#000",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: 30
      }}>
        🛒 Кошик (0)
      </div>
    </main>
  );
}
