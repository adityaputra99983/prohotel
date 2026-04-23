import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Haven Resort - Penginapan Alam Kelas Atas",
  description: "Nikmati pengalaman menginap yang tak terlupakan di Forest Haven Resort. Fasilitas premium, layanan terbaik, dan ketenangan hutan alam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}