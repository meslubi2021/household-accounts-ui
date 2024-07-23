import type { Metadata } from "next";
import "./sass/index.scss";
import { Footer } from "./components";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account.",
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
      <body data-bs-theme="light" className="h-screen">   
        <main>    
          {children}        
        </main>
        <Footer lng={lng} /> 
      </body>
    </html>
  );
}
