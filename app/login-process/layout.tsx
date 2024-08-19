import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: "Household Account",
  description: "Mange household account."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
