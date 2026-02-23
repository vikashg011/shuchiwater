import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Shuchi RO Services | Professional RO Repair & Installation',
  description: 'Professional RO service at your doorstep. RO repair, filter change, new installation & AMC plans at genuine prices. Call now for doorstep service.',
  generator: 'v0.app',
  keywords: 'RO repair, RO service, water purifier, RO installation, filter change, AMC plans',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
