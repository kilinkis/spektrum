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

  return (
    <div
    className={css({
    display: 'grid',
    gap: '1.5rem',
    marginTop: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  })}
   >
      {pairs.map((pair, i) => {
        const ratio = contrastRatio(pair.foregroundColor, pair.backgroundColor)
        const result = passesWCAG(ratio)

        return (
          <div key={i} 
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
          })}
          // need to use inline styles for dynamic colors
          style={{backgroundColor: pair.backgroundColor, color: pair.foregroundColor}}
          >
            <h2>{pair.title}</h2>
            <p>
              Contrast ratio: {ratio.toFixed(2)} —{' '}
              WCAG AA: {result.AA ? '✅' : '❌'} | AAA: {result.AAA ? '✅' : '❌'}
            </p>
            <small>{pair.notes}</small>
          </div>
        )
      })}
    </div>
  );
};

export default Grid;