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
      <form aria-label="Language switcher">
        <label htmlFor="locale-switcher" className={visuallyHidden}>
          Choose language
        </label>
        <select id="locale-switcher" onChange={(e) => switchTo(e.target.value)} value={params.lang}>
          <option value="en">🇬🇧 English</option>
          <option value="da">🇩🇰 Dansk</option>
        </select>
      </form>
    </div>
  )
}

const visuallyHidden = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
})