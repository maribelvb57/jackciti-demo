import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Petstay – El mejor hotel para tu peque',
  description: 'Reserva el mejor hotel para tu perro. Profesionales que cuidan a tu mascota con amor, seguridad y dedicación.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
