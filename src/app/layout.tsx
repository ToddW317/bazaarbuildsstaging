import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/GoogleAd'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Bazaar Builds',
  description: 'Share and discover the best builds for The Bazaar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-CLIENT-ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              <GoogleAd slot="your-ad-slot" />
              {children}
            </main>
            <Footer />
          </AuthProvider>
      </body>
    </html>
  )
}
