import type { Metadata, Viewport } from "next";
import "../sass/index.scss";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  // themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
  authors: [
    {
      name: "Jehyun Jung",
      url: "https://www.linkedin.com/in/jehyun-jung-bb247813b/",
    },
  ],
  // viewport:
    // "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "assets/icons/icon-128x128.png" },
    { rel: "icon", url: "assets/icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  width:"device-width", initialScale: 1, interactiveWidget: "resizes-content"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body data-bs-theme="light">
        {children}
      </body>
    </html>
  )
}
