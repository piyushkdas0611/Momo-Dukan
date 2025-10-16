import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Momo Dukan - Authentic Himalayan Dumplings',
  description: 'Experience the authentic taste of Himalayan momos at Momo Dukan. Delicious dumplings with traditional and fusion flavors.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}