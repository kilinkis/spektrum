import { createClient } from 'contentful'
import { ColorPair } from './types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
})

export async function getColorPairs(): Promise<ColorPair[]> {
  console.log('accessToken', process.env.CONTENTFUL_DELIVERY_TOKEN)
  const res = await client.getEntries({
    content_type: 'colorPair',
  })

  return res.items.map((item: any) => ({
    title: item.fields.title,
    foregroundColor: item.fields.foregroundColor,
    backgroundColor: item.fields.backgroundColor,
    notes: item.fields.notes || '',
  }))
}