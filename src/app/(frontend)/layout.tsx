import React from 'react'
import './styles.css'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteNavbar } from '@/components/SiteNavbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <SiteNavbar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
