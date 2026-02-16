import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HeaderProvider } from './contexts/HeaderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </HeaderProvider>
      </body>
    </html>
  )
}