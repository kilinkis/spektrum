'use client'
import { css } from '@/styled-system/css'
import { useParams, useRouter } from 'next/navigation'

export function LocaleSwitcher() {
  const router = useRouter()
  const params = useParams()

  const switchTo = (locale: string) => {
    router.push(`/${locale}`)
  }

  return (
    <div className={css({ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' })}>
      <select onChange={(e) => switchTo(e.target.value)} value={params.lang}>
        <option value="en">🇬🇧 English</option>
        <option value="da">🇩🇰 Dansk</option>
      </select>
    </div>
  )
}