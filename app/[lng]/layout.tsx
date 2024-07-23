import type { Metadata } from "next";
import "./sass/index.scss";
import { Header, Footer } from "./components";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account.",
  viewport:{ width:"device-width", initialScale: 1, interactiveWidget: "resizes-content" }
};

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
      <body data-bs-theme="light">
        <Header lng={lng} />
        <main>    
          {children}        
        </main>
        <Footer lng={lng} /> 
      </body>
    </html>
  );
}
