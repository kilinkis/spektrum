import { ReactNode } from 'react'
import '@/styled-system/styles.css'

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const {lang: paramLang} = await params
  const lang = ['da', 'en'].includes(paramLang) ? paramLang : 'en'

  return (
    <html lang={lang}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://spektrum-omega.vercel.app/en" />
        <link rel="alternate" hrefLang="da" href="https://spektrum-omega.vercel.app/da" />
      </head>
      <body>{children}</body>
    </html>
  )
}