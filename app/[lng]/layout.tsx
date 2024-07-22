import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-bs-theme="light">{children}</body>
    </html>
  );
}
