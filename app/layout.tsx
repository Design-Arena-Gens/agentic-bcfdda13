import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "School CRM - Lead Management System",
  description: "Comprehensive sales and lead management system for education sector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
