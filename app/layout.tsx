import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

