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
      <body>{children}</body>
    </html>
  )
}