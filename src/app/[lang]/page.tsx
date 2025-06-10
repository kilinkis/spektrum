import { css } from '@/styled-system/css'

import Grid from '../components/grid'
import { LocaleSwitcher } from '../components/locale-switcher'

type HomePageParams = {
  params: Promise<{ lang: 'en' | 'da' }>
}

// TODO: move this content to the CMS
export async function generateMetadata({ params }: HomePageParams) {
  const {lang: paramLang} = await params
  const metadataMap = {
    en: {
      title: 'Spektrum – Accessible Color Pairings',
      description: 'Visualize and evaluate WCAG contrast ratios.',
    },
    da: {
      title: 'Spektrum – Tilgængelige Farvekombinationer',
      description: 'Visualisér og vurder WCAG-kontrastforhold.',
    },
  }

  const lang = paramLang as 'en' | 'da'
  const fallback = metadataMap.en

  return metadataMap[lang] ?? fallback
}

export default async function Home({ params }: HomePageParams) {
  const { lang } = await params;
  const locale = lang === 'da' ? 'da-DK' : 'en-US'

  return (
    <main className={css({ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: '$body' })}>
      <LocaleSwitcher />
      <h1>🎨 Spektrum</h1>
      <p>A quick look at accessible (and not-so-accessible) color pairings.</p>

      <Grid locale={locale} />

    </main>
  )
}

// This function generates static parameters for the dynamic route
// allowing Next.js to pre-render pages for each locale
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'da' }]
}
