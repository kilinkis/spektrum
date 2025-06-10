import React from 'react';

import { getColorPairs } from '@/lib/contentful'
import { contrastRatio } from '@/lib/contrast/contrast-ratio'
import { passesWCAG } from '@/lib/contrast/passes-wcag'
import { css } from '@/styled-system/css';

type GridProps = {
  locale?: string;
};

const Grid = async ({locale= 'en-US'}: GridProps) => {
  const pairs = await getColorPairs(locale)

  if (!pairs || pairs.length === 0) {
    return <p>No color pairs found.</p>
  }

  // ...existing imports...

return (
  <section aria-labelledby="color-pairings-heading">
    <h2 id="color-pairings-heading" className={css({ fontSize: 'xl', marginBottom: '1rem' })}>
      Color Pairings
    </h2>
    <ul
      className={css({
        display: 'grid',
        gap: '1.5rem',
        marginTop: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        listStyle: 'none',
        padding: 0,
      })}
      role="list"
    >
      {pairs.map((pair, i) => {
        const ratio = contrastRatio(pair.foregroundColor, pair.backgroundColor)
        const result = passesWCAG(ratio)

        return (
          <li
            key={i}
            role="listitem"
            className={css({
              backgroundColor: pair.backgroundColor,
              color: pair.foregroundColor,
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease',
              _hover: {
                transform: 'scale(1.02)',
              },
              outline: 'none',
              _focusVisible: {
                boxShadow: '0 0 0 3px #7c3aed',
              },
            })}
            style={{
              backgroundColor: pair.backgroundColor,
              color: pair.foregroundColor,
            }}
            aria-label={`Color pair: ${pair.title}, contrast ratio ${ratio.toFixed(2)}`}
          >
            <h3>{pair.title}</h3>
            <p>
              Contrast ratio: {ratio.toFixed(2)} —{' '}
              WCAG AA: {result.AA ? '✅' : '❌'} | AAA: {result.AAA ? '✅' : '❌'}
            </p>
            <small>{pair.notes}</small>
          </li>
        )
      })}
    </ul>
  </section>
)
};

export default Grid;