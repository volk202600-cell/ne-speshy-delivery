export const metadata = {
  title: "НЕ СПЕШИ — доставка їжі",
  description: "Доставка їжі НЕ СПЕШИ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body style={{ margin: 0, background: "#fafafa" }}>
        {children}
      </body>
    </html>
  );
}
