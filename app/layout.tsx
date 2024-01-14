
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import AuthProvider from '../components/authProvider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'
import ReactQueryProvider from '@/providers/reactQueryProvider'
import ToastifyProvider from '@/providers/Toastify/toastifyProvider'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  // display:'swap'
})

export const metadata: Metadata = {
  title: 'LIGOS AI',
  description: 'Multiple AI services in one place'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)


  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <Head>
       <link href="/AI_LOGO.png" rel={"icon"} sizes="any" />
      </Head>
      <AuthProvider session={session}>
        <ReactQueryProvider>
          <body className={inter.className}>
           <ToastifyProvider> 
            {children}
           </ToastifyProvider>
          </body>
        </ReactQueryProvider>
      </AuthProvider>
    </html>
  )
}
