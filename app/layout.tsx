import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Dropdown from '@/components/dropdown'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/redux/provider'
import { tokenValue } from '@/lib/token'
import { getUserDataFromToken } from '@/lib/getDataFromToken'
import { DataStoredInToken } from '@/lib/props'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopCart',
  description: 'ShopCart | Shopping to ShopCart',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = tokenValue()
  const user = await getUserDataFromToken() as DataStoredInToken
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <Navbar />
          <main className='pt-14'>
            {children}
          </main>
          <Dropdown token={token} user={user}/>
        </Providers>
      </body>
    </html>
  )
}
