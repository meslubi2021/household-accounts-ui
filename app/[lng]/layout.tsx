import type { Metadata, Viewport } from "next";
import "./sass/index.scss";
import { Header, Footer } from "./components";
import { dongle } from "./utils";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account."
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
        <Header lng={lng} />
        <main>    
          {children}        
        </main>
        <Footer lng={lng} /> 
      </body>
    </html>
  );
}
