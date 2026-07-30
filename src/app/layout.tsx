import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariage d'Eric et Valérie",
  description: "Notre mariage - 26 Septembre 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
