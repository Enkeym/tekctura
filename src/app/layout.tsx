import type { Metadata } from "next"
import "./fonts.scss"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://tekctypa.art"),
  title: "Студия медиа-дизайна ТЕКСТУРА",
  description: "Объединяем технологии, искусство и ощущения",
  openGraph: {
    title: "ТЕКСТУРА — студия медиа-дизайна",
    description: "Инсталляции, медиа, сопровождение мероприятий",
    url: "https://tekctypa.art",
    siteName: "ТЕКСТУРА",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ТЕКСТУРА — медиа-дизайн"
      }
    ],
    type: "website"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/fonts/StereoGothicW06-300.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Подключение шрифтов */}
      </head>
      <body>{children}</body>
    </html>
  )
}
