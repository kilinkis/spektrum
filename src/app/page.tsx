import { css } from '@/styled-system/css'

import Grid from './components/grid'

export default async function Home() {

  return (
    <main className={css({ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: '$body' })}>
      <h1>🎨 Spektrum</h1>
      <p>A quick look at accessible (and not-so-accessible) color pairings.</p>

      <Grid />
    </main>
  )
}



