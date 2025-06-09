import { createClient } from 'contentful'
import { ColorPair } from './types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
})

export async function getColorPairs(locale: string = 'en-US'): Promise<ColorPair[]> {
  const res = await client.getEntries({
    content_type: 'colorPair',
    locale,
  })

  return res.items.map((item: any) => ({
    title: item.fields.title,
    foregroundColor: item.fields.foregroundColor,
    backgroundColor: item.fields.backgroundColor,
    notes: item.fields.notes || '',
  }))
}