import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Dropdown from '@/components/dropdown'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/redux/provider'
import { tokenValue } from '@/lib/token'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopCart',
  description: 'ShopCart | Shopping to ShopCart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = tokenValue()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <Navbar />
          <main className='pt-16'>
            {children}
          </main>
          <Dropdown token={token}/>
        </Providers>
      </body>
    </html>
  )
}
