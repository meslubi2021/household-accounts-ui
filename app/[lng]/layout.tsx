import type { Metadata } from "next";
import "./sass/index.scss";
import { Footer } from "./components";

export const metadata: Metadata = {
  title: "Household Account",
  description: "Mange household account.",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
  lng: string
}>) {
  return (
    <html lang="en">
      <body data-bs-theme="light" className="h-screen">   
        <main className="h-5/6">    
          {children}        
        </main>
        <Footer lng={"en"} /> 
      </body>
    </html>
  );
}
