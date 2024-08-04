import type { Metadata, Viewport } from "next";
import "../sass/index.scss";
import App from '../app'
import { Header, Footer } from "../components";
import { dongle } from "../utils";

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

export default async function RootLayout({
  children,
  params: {
    lng
  }
}: Readonly<{
  children: React.ReactNode;
  params: {lng: string}
}>) {
  return (
    <html lang={lng}>      
      <body data-bs-theme="light" className={dongle.className}>
        <App>
          <Header lng={lng} />
            <main>    
              {children}        
            </main>
            <Footer lng={lng} />
        </App>
      </body>
    </html>
  );
}
